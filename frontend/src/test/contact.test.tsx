import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from '../components/sections/Contact';
import * as api from '../lib/api';

function renderContact() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Contact />
    </MemoryRouter>,
  );
}

afterEach(() => vi.restoreAllMocks());

describe('contact form', () => {
  it('does not call the API until required fields are filled', async () => {
    const spy = vi.spyOn(api, 'sendContactRequest');
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: /send project brief/i }));

    expect(spy).not.toHaveBeenCalled();
  });

  it('submits and shows the returned reference id', async () => {
    vi.spyOn(api, 'sendContactRequest').mockResolvedValue({
      ok: true,
      message: 'Project brief received.',
      submissionId: 'abc123',
    });
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Project type'), 'full-stack-delivery');
    await user.type(
      screen.getByLabelText('Project brief'),
      'We need a full rebuild of our product interface.',
    );
    await user.click(screen.getByRole('button', { name: /send project brief/i }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/abc123/),
    );
  });

  it('shows an inline error when the request fails (page stays up)', async () => {
    vi.spyOn(api, 'sendContactRequest').mockRejectedValue(new Error('Network down'));
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Project type'), 'design-system');
    await user.type(screen.getByLabelText('Project brief'), 'Design system cleanup, please.');
    await user.click(screen.getByRole('button', { name: /send project brief/i }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/network down/i),
    );
  });
});
