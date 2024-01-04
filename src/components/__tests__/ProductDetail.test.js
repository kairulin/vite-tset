import { test, expect, vi } from 'vitest'
import {render, screen, fireEvent, waitFor, within} from '@testing-library/vue'
import ProductDetail from '../../views/ProductDetail.vue'
test("按下追蹤商品按鈕", async () => {
    render(ProductDetail);

    const listItems = within(screen.getByRole("list")).getAllByRole(
        "listitem"
      );
    expect(listItems).toHaveLength(3);
    expect(listItems).toMatchInlineSnapshot(`
      [
        <li
          class="specification"
          data-v-95e08fb6=""
        >
          <el-image
            class="card__info__image"
            data-v-95e08fb6=""
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <span
            class="specification__info"
            data-v-95e08fb6=""
          >
            Small
          </span>
        </li>,
        <li
          class="specification"
          data-v-95e08fb6=""
        >
          <el-image
            class="card__info__image"
            data-v-95e08fb6=""
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <span
            class="specification__info"
            data-v-95e08fb6=""
          >
            Medium
          </span>
        </li>,
        <li
          class="specification"
          data-v-95e08fb6=""
        >
          <el-image
            class="card__info__image"
            data-v-95e08fb6=""
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <span
            class="specification__info"
            data-v-95e08fb6=""
          >
            Large
          </span>
        </li>,
      ]
    `)
})