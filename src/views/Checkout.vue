<template>
  <div class="container">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center"
    >
      <div class="m-3 p-3 col" v-if="!isEmptyCart()">
        <!-- <div class="card border-dark"> -->
        <router-link class="btn btn-outline-primary mb-3" to="/"
          ><i class="bi bi-arrow-left-circle"></i> Back to shop</router-link
        >

        <table class="table table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product name</th>
              <th scope="col">Price</th>
              <th scope="col">Count</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(product, index) in cartList" :key="product.id">
              <CheckoutTableRow
                :product="product"
                :index="index"
                :productAvailableCount="productAvailableCount"
                :removeFromCart="removeFromCart"
                :addToCart="addToCart"
              />
            </template>
          </tbody>
          <tfoot>
            <td colspan="3" />
            <td class="m-0 p-0 fw-bold text-muted text-center">
              Total amount:
            </td>
            <td class="fw-bold">{{ totalPrice.toFixed(2) }} €</td>
          </tfoot>
        </table>
      </div>
      <!-- </div> -->
      <div class="m-3 p-3 col" v-else>
        <div class="alert alert-info" role="alert">
          Your basket is empty! Please select products on the
          <router-link class="btn-link" to="/">sale page</router-link>
        </div>
      </div>

      <div class="m-0 p-3 col">
        <label for="productPrice" class="form-label"
          ><strong>Cash amount inserted</strong></label
        >
        <div class="input-group">
          <input
            v-model="cashInserted"
            type="number"
            class="form-control"
            id="productPrice"
            aria-describedby="productPriceHelp"
            min="0.00"
            step="0.01"
          />
          <span class="input-group-text">€</span>

          <button class="btn btn-outline-dark" @click="cashInserted = 0">
            <i class="bi bi-arrow-repeat"></i> Reset
          </button>
        </div>
        <div id="productPriceHelp" class="form-text mb-3">
          Enter the amount of money the person. For example: 50
        </div>

        <div
          :class="[
            getOverpay() >= 0 ? 'alert alert-success' : 'alert alert-warning',
          ]"
          role="alert"
        >
          <template v-if="cashInserted > totalPrice && !isEmptyCart()">
            Overpayment money is: <strong>{{ getOverpay() }}</strong>
          </template>
          <template
            v-if="
              cashInserted < totalPrice && cashInserted > 0 && !isEmptyCart()
            "
          >
            Not enough cash. There should be more!
            <strong>Missing amount: {{ getOverpay() }}</strong>
          </template>
          <template v-if="cashInserted <= 0 && !isEmptyCart()">
            No cash money inserted!
          </template>
          <template v-if="cashInserted == totalPrice && !isEmptyCart()">
            <strong>No overpayment!</strong>
          </template>
          <template v-if="isEmptyCart()">
            The order is empty!
          </template>
        </div>
      </div>

      <div class="m-3 p-3 col text-center" v-show="!isEmptyCart()">
        <button class="btn btn-lg btn-success" @click="confirmOrder(cartList)">
          Everything is paid, confirm the order!
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CheckoutTableRow from "@/components/CheckoutTableRow.vue";

export default {
  name: "Checkout",
  props: {},
  components: { CheckoutTableRow },

  data() {
    return {
      cashInserted: 0,
    };
  },
  computed: {
    ...mapGetters(["totalPrice", "cartList", "productAvailableCount"]),
  },
  methods: {
    ...mapActions(["addToCart", "clearCart", "removeFromCart","confirmOrder"]),
    getOverpay() {
      return (this.cashInserted - this.totalPrice).toFixed(2);
    },
    isEmptyCart() {
      return !this.cartList.length;
    },
  },
};
</script>
