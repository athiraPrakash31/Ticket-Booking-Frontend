import styles from "./footer.module.css";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons from react-icons

export const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerContainer}>
                    {/* Footer lines */}
                    <div className={styles.footerLine}></div>
                    
                    {/* Footer Title */}
                    <div className={styles.footerHead}>
                        Book My Seat
                    </div>
                    
                    <div className={styles.footerLine}></div>
                    
                    {/* Footer Navigation Links */}
                   
                </div>
                 

                    {/* Social Media Icons */}
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram />
                        </a>
                    </div>

                    {/* Footer Copyright */}
                    <div className={styles.footerCopyright}>
                        © {new Date().getFullYear()} Book My Seat. All rights reserved.
                    </div>
            </div>
        </>
    );
};

export default Footer;
