import { mount } from "table/RemoteTable";
import React, { useRef, useEffect } from "react";

export default (props) => {
    const ref = useRef(null);

    useEffect(() => {
        mount(props, ref.current);
    });

    return <div ref={ref} />;
};