import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { createOrderAsync } from "../features/order/orderSlice";
import { selectCurrentOrder } from "../features/order/orderSlice";

function Checkout() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);

  const [open, setOpen] = useState(true);

  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const totlaAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totlaItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    const order = {
      items,
      totlaAmount,
      totlaItems,
      user,
      paymentMethod,
      selectedAddress,
      status: "pending", // other status can be delivered , recieved.
    };
    dispatch(createOrderAsync(order));
  };

  //TODO : Redirect to order-success page
  //TODO : clear cart after order
  //TODO : on server change the stock number of items

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-zinc-200 px-6 py-5 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);

                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
                console.log(data);
              })}
            >
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                      <label
                        for="Name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="Name"
                          autocomplete="given-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email Address
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          autocomplete="email"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="country"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div class="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          autocomplete="phone"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-full">
                      <label
                        for="street-address"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("street-address", {
                            required: "street-address is required",
                          })}
                          id="street-address"
                          autocomplete="street-address"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                      <label
                        for="city"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autocomplete="address-level2"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="state"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autocomplete="address-level1"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="pincode"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "pincode is required",
                          })}
                          id="pincode"
                          autocomplete="postal-code"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing Addresses
                  </p>

                  <ul role="list" className="divide-y divide-gray-100">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-3 border-gray-200 "
                      >
                        <div className="flex  gap-x-4">
                          <input
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />

                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {address.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.state}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div class="mt-10 space-y-10">
                    <fieldset>
                      <legend class="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p class="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div class="mt-6 space-y-6">
                        <div class="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            type="radio"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            for="cash"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div class="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            onChange={handlePayment}
                            checked={paymentMethod === "card"}
                            type="radio"
                            value="card"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            for="card"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card payments
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            {/* here we added the whole cart component fron cart.js*/}
            <div className="mx-auto mt-12  bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
              <h1 className="text-4xl font-bold tracking-tight my-5 mx-5 text-gray-900">
                Cart
              </h1>
              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={item.title}
                            src={item.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.title}</a>
                              </h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, item.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {Math.floor(totlaAmount)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totlaItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
