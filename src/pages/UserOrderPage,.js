import NavBar from "../features/navbar/NavBar";
import UserOrders from "../features/user/compponents/userOrders";

function UserOrderPage() {
    return (
        <div>
<NavBar>
    <h1 className="mx-auto text-2xl ">My Orders</h1>
    <UserOrders></UserOrders>
</NavBar>
        </div>

    );
}

export default UserOrderPage;