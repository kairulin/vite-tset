import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import {render, screen, fireEvent, waitFor, within} from '@testing-library/vue'

import Test from '../Test.vue'
import { server } from '@/mocks/server'
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
describe('Test', () => {
  it('renders properly', async () => {
    render(Test);
    const btn = screen.getByRole('button', {
      name: /請按/i
    })
    await fireEvent.click(btn)
    // waitFor
    // expect(screen.getByText(/Loading\.\.\./i));    
    vi.useFakeTimers();
    await waitFor(() => {
      screen.debug()
      screen.getByRole("list");
    })
    vi.runOnlyPendingTimers()
      const listItems = within(screen.getByRole("list")).getAllByRole(
      "listitem"
    );
    expect(listItems).toHaveLength(7);
    expect(listItems).toMatchInlineSnapshot(`
      [
        <li>
          Sun
        </li>,
        <li>
          Mon
        </li>,
        <li>
          Tue
        </li>,
        <li>
          Wed
        </li>,
        <li>
          Thu
        </li>,
        <li>
          Fri
        </li>,
        <li>
          Sat
        </li>,
      ]
    `);
  })
})
