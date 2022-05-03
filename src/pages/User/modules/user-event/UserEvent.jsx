import React, { useEffect } from 'react';
import { getUserEvent } from "../../../../services/user";

export default function UserEvent() {
    useEffect(() => {
        getUserEvent().then(res => {
        })
        return () => {
        }
    }, [])

    return (
        <div>UserEvent</div>
    )
}
