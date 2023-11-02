import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./css/navbar.module.css";
import { searchUser } from "../redux/apislice/userDetailsSlice";

export default function Header() {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(searchUser(query));
    }, [query]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        // console.log(window.scrollY);
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        }
    }, [lastScrollY]);

    // const searchQueryHandler = (event) => {
    //     if (event.key === "Enter" && query.length > 0) {
    //         navigate(`/search/${query}`);
    //         setTimeout(() => {
    //             setShowSearch(false);
    //         }, 1000);
    //     }
    // }

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationHandler = (type) => {
        navigate(type);
        setMobileMenu(false);
    }

    return (
        <header className={`${styles.header} ${mobileMenu ? `${styles.mobileView}` : ""} ${styles[show]}`}>
            <div className={styles.contentWrapper}>
                <div className={styles.logo} onClick={() => navigate("/")}>
                    <p>LOGO</p>
                </div>

                <ul className={styles.menuItems}>
                    <li className={styles.menuItem} onClick={() => navigationHandler("createuser")}>Create Users</li>
                    <li className={styles.menuItem}>
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className={styles.mobileMenuItems}>
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
                </div>
            </div>

            {showSearch && <div className={styles.searchBar}>
                <div className={styles.contentWrapper}>
                    <div className={styles.searchInput}>
                        <input
                            type='text'
                            placeholder='Search for a user name or age ....'
                            onChange={(e) => setQuery(e.target.value)}
                            // onKeyUp={searchQueryHandler}
                        />
                        <VscChromeClose onClick={() => [setShowSearch(false), setQuery("")]} />
                    </div>
                </div>
            </div>}
        </header >
    )
}