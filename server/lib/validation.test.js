import assert from 'node:assert/strict';
import test from 'node:test';
import {
  validateContactPayload,
  validateInteractionPayload,
} from './validation.js';

test('validateContactPayload accepts a valid request', () => {
  const result = validateContactPayload({
    name: 'Peter Ogba',
    email: 'peter4tech@gmail.com',
    company: 'Studio',
    projectType: 'portfolio rebuild',
    budget: '3k-7k',
    timeline: '1-month',
    message: 'I need a total rebuild for my portfolio with a backend and docs.',
  });

  assert.equal(result.valid, true);
  assert.equal(result.value.email, 'peter4tech@gmail.com');
});

test('validateContactPayload rejects short message and invalid email', () => {
  const result = validateContactPayload({
    name: 'P',
    email: 'invalid',
    message: 'Too short',
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'Name must be at least 2 characters.',
    'Email address is invalid.',
    'Project brief must be at least 20 characters.',
  ]);
});

test('validateInteractionPayload requires an event', () => {
  const result = validateInteractionPayload({
    section: 'hero',
    label: 'start-project',
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, ['Interaction event is required.']);
});
