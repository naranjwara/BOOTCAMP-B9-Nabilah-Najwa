import React, {useState, useEffect } from "react";

/**
 * Komponen Clock menampilkan jam digital yang akan terupdate setiap detik.
 * @component
 * @example
 *  return (
        <div>
            <h2>{time}</h2>
        </div>
    )
 */
const Clock = () => {
    // State untuk menyimpan waktu saat ini dalam format string
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    /**
     * Menggunakan useEffect untuk mengatur interval yang akan memperbaharui waktu setiap detik,
     * useEffect akan membersihkan interval ketika komponen unmount 
     */
    useEffect(() => {const timerId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // ! Pastikan untuk membersihkan interval agar tidak terjadi kebocoran memori
        return () => clearInterval(timerId);
    }, []);

    return (
        <div>
            <h2>{time}</h2>
        </div>
    )

} 

export default Clock;
