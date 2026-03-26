const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimLine(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function trimBlock(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\r\n/g, '\n').slice(0, maxLength);
}

export function validateContactPayload(payload) {
  const value = {
    name: trimLine(payload?.name, 80),
    email: trimLine(payload?.email, 120).toLowerCase(),
    company: trimLine(payload?.company, 80),
    projectType: trimLine(payload?.projectType, 60),
    budget: trimLine(payload?.budget, 40),
    timeline: trimLine(payload?.timeline, 40),
    message: trimBlock(payload?.message, 2000),
  };

  const errors = [];

  if (value.name.length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  if (!emailPattern.test(value.email)) {
    errors.push('Email address is invalid.');
  }

  if (value.message.length < 20) {
    errors.push('Project brief must be at least 20 characters.');
  }

  return {
    valid: errors.length === 0,
    errors,
    value,
  };
}

export function validateInteractionPayload(payload) {
  const value = {
    event: trimLine(payload?.event, 64),
    section: trimLine(payload?.section, 64),
    label: trimLine(payload?.label, 96),
  };

  const errors = [];

  if (value.event.length < 2) {
    errors.push('Interaction event is required.');
  }

  return {
    valid: errors.length === 0,
    errors,
    value,
  };
}
