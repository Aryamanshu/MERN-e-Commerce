import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Select,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { discountedPrice } from "../../app/constants";
import Modal from "../common/Modal";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const alert = useAlert();

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null)
  const totlaAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totlaItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));

    alert.error("Item Removed");
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      <div>
        <div className="mx-auto mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight my-5 mx-5 text-gray-900">
            Cart
          </h1>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              {status === "loading" ? (
                <Grid
                  visible={true}
                  height="120"
                  width="120"
                  color="rgb(79, 70,229)"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                />
              ) : null}
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
                          <Modal
                            title={`Delete ${item.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="DELETE"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={()=>setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>
                          <button
                            onClick={e => {setOpenModal(item.id)}}
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

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
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
    </>
  );
}
