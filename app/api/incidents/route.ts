import { NextRequest, NextResponse } from 'next/server';
import { Incident } from '@/lib/types';
import { generateId } from '@/lib/utils';

// In-memory storage for demo purposes
// In production, use a proper database
const incidents: Map<string, Incident> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'create':
        return handleCreateIncident(data);
      
      case 'update':
        return handleUpdateIncident(data);
      
      case 'get':
        return handleGetIncident(data);
      
      case 'list':
        return handleListIncidents(data);
      
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Incidents API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleCreateIncident(data: any) {
  const { userId, location, notes = '', rightsInfoSummary = '' } = data;

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  const incident: Incident = {
    incidentId: generateId(),
    userId,
    timestamp: new Date(),
    location: location || {
      latitude: 0,
      longitude: 0,
      state: 'Unknown'
    },
    notes,
    rightsInfoSummary,
    status: 'recording'
  };

  incidents.set(incident.incidentId, incident);

  return NextResponse.json({
    success: true,
    data: {
      incidentId: incident.incidentId,
      timestamp: incident.timestamp.toISOString(),
      status: incident.status
    }
  });
}

async function handleUpdateIncident(data: any) {
  const { incidentId, ...updates } = data;

  if (!incidentId) {
    return NextResponse.json(
      { error: 'Incident ID is required' },
      { status: 400 }
    );
  }

  const incident = incidents.get(incidentId);
  if (!incident) {
    return NextResponse.json(
      { error: 'Incident not found' },
      { status: 404 }
    );
  }

  // Update incident with provided data
  const updatedIncident: Incident = {
    ...incident,
    ...updates,
    // Ensure timestamp remains a Date object
    timestamp: incident.timestamp
  };

  incidents.set(incidentId, updatedIncident);

  return NextResponse.json({
    success: true,
    data: {
      incidentId,
      status: updatedIncident.status,
      updatedAt: new Date().toISOString()
    }
  });
}

async function handleGetIncident(data: any) {
  const { incidentId } = data;

  if (!incidentId) {
    return NextResponse.json(
      { error: 'Incident ID is required' },
      { status: 400 }
    );
  }

  const incident = incidents.get(incidentId);
  if (!incident) {
    return NextResponse.json(
      { error: 'Incident not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      ...incident,
      timestamp: incident.timestamp.toISOString()
    }
  });
}

async function handleListIncidents(data: any) {
  const { userId, limit = 10, offset = 0 } = data;

  let userIncidents = Array.from(incidents.values());

  if (userId) {
    userIncidents = userIncidents.filter(incident => incident.userId === userId);
  }

  // Sort by timestamp (newest first)
  userIncidents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Apply pagination
  const paginatedIncidents = userIncidents
    .slice(offset, offset + limit)
    .map(incident => ({
      ...incident,
      timestamp: incident.timestamp.toISOString()
    }));

  return NextResponse.json({
    success: true,
    data: {
      incidents: paginatedIncidents,
      total: userIncidents.length,
      limit,
      offset
    }
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const incidentId = searchParams.get('id');
  const userId = searchParams.get('userId');

  if (incidentId) {
    return handleGetIncident({ incidentId });
  }

  return handleListIncidents({ userId });
}
