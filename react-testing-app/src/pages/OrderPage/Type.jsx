import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import { OrderContext } from "../../contexts/OrderContext";
// import ErrorBanner from "../../components/ErrorBanner";

function Type({ orderType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    const [orderData, updateItemCount] = useContext(OrderContext);

    useEffect(() => {
        loadItems(orderType);
    }, [orderType]);

    const loadItems = async (orderType) => {
        try {
            let response = await axios.get(`http://localhost:4000/${orderType}`);
            setItems(response.data);
        } catch (error) {
            setError(true);
        }
    };


    const ItemComponent = orderType === "products" ? Products : Options;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, orderType)}
        />
    ));

    // if (error) {
    //     return <ErrorBanner message="에러가 발생했습니다." />;
    // }

    // let orderTypeKorean = orderType === "products" ? "상품" : "옵션";
    return (
        <div>
            <h2>주문 종류</h2>
            <p>하나의 가격</p>
            <p>총 가격: </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: orderType === "options" && "column",
                }}
            >
                {optionItems}
            </div>
        </div>
    );
}

export default Type;