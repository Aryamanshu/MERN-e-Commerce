export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
