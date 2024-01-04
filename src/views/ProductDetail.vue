<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>所有分類</el-breadcrumb-item>
        <el-breadcrumb-item>民生用品</el-breadcrumb-item>
        <el-breadcrumb-item>醬油</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
        <div class="image">
            <el-carousel indicator-position="outside" height="500px" :autoplay="false">
                <el-carousel-item v-for="image in data.images" :key="image">
                    <el-image :src="image" fit="cover" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="card">
            <span>{{ data.title }}</span>
            <div>
                <el-popover placement="right" :width="300" trigger="hover">
                    <template #reference>
                        <span>
                            {{ data.company?.name }}
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </span>
                    </template>
                    <template #default>
                        <div>
                            <div>
                                <p>公司名稱：{{ data.company?.name }}</p>
                                <p>公司地址：{{ data.company?.address }}</p>
                                <p>聯絡信箱：{{ data.company?.email }}</p>
                                <p>聯絡電話：{{ data.company?.phone }}</p>
                            </div>
                        </div>
                    </template>
                </el-popover>
            </div>
            <span>
                <label v-for="(tag) in data.hashtags" :key="tag">
                    #{{ tag }}
                </label>
            </span>
            <!-- 規格 -->
            <div class="card__info">
                <h3>規格</h3>
                <ul class="card__info__specification">
                    <template v-for="variation in data.variations" :key="variation.specification">
                        <li class="specification" @click="selectSpec(variation)">
                            <el-image class="card__info__image" :src="variation.image"></el-image>
                            <span class="specification__info">
                                {{ variation.specification }}
                            </span>
                        </li>
                    </template>
                </ul>
            </div>
            <!-- 市售價 -->
            <div class="card__info">
                <h3>市售價</h3>
                <p>{{ selectedVariation.retailPrice }}</p>
            </div>
            <!-- 價格 -->
            <div class="card__info">
                <h3>價格</h3>
                <p v-for="({ price }, priceIndex) in selectedVariation.pricingStrategy" :key="priceIndex">
                    ${{ price }}
                </p>
            </div>
            <!-- 起批量 -->
            <div class="card__info">
                <h3>起批量</h3>
                <p v-for="({ quantity }, quantityIndex) in selectedVariation.pricingStrategy" :key="quantityIndex">
                    {{ quantity }}
                </p>
            </div>
            <!-- 數量 -->
            <div class="card__info">
                <h3>數量</h3>
                <el-input-number v-model="selectedNum" :min="1" />
                <p class="card__info__sold">已售2,000</p>
            </div>

            <div class="card__button">
                <el-button @click="handleLike">追蹤商品</el-button>
                <el-button type="warning" @click="handleCart">加入購物車</el-button>
                <el-button type="danger" @click="handleBuy">直接購買</el-button>
            </div>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane label="商品資訊">{{ data.info }}</el-tab-pane>
            <el-tab-pane label="商品評論">商品評論</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
// import { useRoute } from 'vue-router'
import { onMounted, nextTick, ref, computed, } from 'vue'
// import { useCommodityStore } from '@/stores/commodityStore';
import { ArrowRight, InfoFilled } from '@element-plus/icons-vue'
// import ProductList from '@/components/ProductList/index.vue'

// const path = useRoute();
// const { id } = path.params;
// const commodityStore = useCommodityStore();
// const items = computed(() => commodityStore.list);

// const findData = async () => await commodityStore.find(id);

const data = ref({
          id: 1,
          title: "【80L超大容量】後背包 大容量後背包 旅行包 雙肩包 背包 大容量背包 防水後背包 旅行背包 戶外背包 背包男 防潑水",
          info: `
          材質：尼龍

          顏色：白色/粉色/藍色/黑色

          可放15.6吋電腦

          尺寸：

          長35cm

          寬13cm

          高45cm
          `,
          images: [
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
              'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
              'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
              'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
          ],
          hashtags: ["背包", "旅行"],
          company: {
            name: "創力美股份有限公司",
            address: "雲林縣斗六市雲林路二段203號9樓",
            email: "test@gmail.com",
            phone: "055360223"
          },
          variations: [
            {
                specification: "Small",
                image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                retailPrice: 800.00,
                price: 80.00,
                minOrderQuantity: 10,
                pricingStrategy: [
                    {
                        quantity: 10,
                        price: 80.00
                    },
                    {
                        quantity: 20,
                        price: 150.00
                    },
                    {
                        quantity: 30,
                        price: 220.00
                    },
                ]
            },
            {
                specification: "Medium",
                image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                retailPrice: 900.00,
                price: 90.00,
                minOrderQuantity: 10,
                pricingStrategy: [
                    {
                        quantity: 10,
                        price: 90.00
                    },
                    {
                        quantity: 20,
                        price: 170.00
                    },
                    {
                        quantity: 30,
                        price: 250.00
                    },
                ]
            },
            {
                specification: "Large",
                image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                retailPrice: 1000.00,
                price: 100.00,
                minOrderQuantity: 10,
                pricingStrategy: [
                    {
                        quantity: 10,
                        price: 100.00
                    },
                    {
                        quantity: 20,
                        price: 190.00
                    },
                    {
                        quantity: 30,
                        price: 280.00
                    },
                ]
            }
          ]
      }
    )
const selectedVariation = ref({
                specification: "Small",
                image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                retailPrice: 800.00,
                price: 80.00,
                minOrderQuantity: 10,
                pricingStrategy: [
                    {
                        quantity: 10,
                        price: 80.00
                    },
                    {
                        quantity: 20,
                        price: 150.00
                    },
                    {
                        quantity: 30,
                        price: 220.00
                    },
                ]
            })

const selectedNum = ref(1);

const selectSpec = (newVariation) => {
    selectedVariation.value = newVariation
    // commodityStore.changeVariation(newVariation)
};
const indicatorToImage = () => {
    var image = document.querySelectorAll(".el-carousel__button");
    for (let i in data.value.images) {
        let img = document.createElement('img');
        img.src = data.value.images[i];
        image[i].appendChild(img);
    }
};
const handleCart = () => {

}
const handleBuy = () => {

}
const handleLike = () => {

}
// onMounted(async () => {
// //     await findData();
//     await nextTick(() => {
//         indicatorToImage();
//     })
// })
</script>
<style scoped lang="scss">
.content {
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.el-carousel__item h3 {
    display: flex;
    justify-content: center;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.el-image {
    height: 100%;
    display: flex;
}

:deep(.el-carousel__indicator) {
    width: 50px;
}

:deep(.el-carousel__button) img {
    width: 50px;
    height: 50px;
}

.card {
    border: 1px solid #212121;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: #f3baba;

    &__info {
        &__specification {
            display: flex;
            gap: 5px;
        }

        &__sold {
            color: #757575;
            margin-left: 50px;
        }

        &__image {
            width: 32px;
            height: 32px;
        }

        h3 {
            color: #5f5e5e;
            width: 110px;
            font-size: inherit;
            font-weight: 400;
        }

        p {
            width: 100px;
        }

        display: flex;
        align-items: center;
    }
}

.specification {
    display: flex;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, .09);
    padding: 8px;
    background-color: #fff;

    &:hover {
        border-color: #ee4d2d;
    }

    &__info {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        height: 32px;
        white-space: nowrap;
        cursor: pointer;
        color: var(--el-button-text-color);
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        font-weight: var(--el-button-font-weight);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        vertical-align: middle;
        -webkit-appearance: none;
        background-color: var(--el-button-bg-color);
        padding: 8px 15px;
        font-size: var(--el-font-size-base);
    }
}
ul {
    padding: 0
}
</style>