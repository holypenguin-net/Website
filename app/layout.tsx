import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";
import style from "./navbar.module.css";
import nav_icon from "../public/icons/dark/nav_icon_dark.svg";
import news from "../public/icons/dark/news_dark.svg";
import logo from "../public/icons/dark/logo_dark.svg";
import server from "../public/icons/dark/server_dark.svg";
import games from "../public/icons/dark/game_dark.svg";
import minecraft from "../public/icons/minecraft.svg";
import terraria from "../public/icons/terraria.svg";
import discord from "../public/icons/discord.svg";
import login from "../public/icons/dark/login_dark.svg";


export default function RootLayout({children}: {children: React.ReactNode}) {
  let image_size = 300;

  return (
    <html>
      <head />
      <body>

        {/* Navbar left */}
        <nav className={style.navbar}>
          <ul className={style.navbar_nav}>

          <li className={style.logo}>
            <Link href="/" className={style.nav_link}>
              <span className={`${style.link_text} ${style.logo_text}`}>Home</span>
              <Image src={nav_icon} alt='Logo'/>
            </Link>
          </li>

          <li className={style.nav_item}>
            <Link href="/news" className={style.nav_link}>
              <Image src={news} alt='News' width={image_size} height={image_size}/>
              <span className={style.link_text}>News</span>
            </Link>
          </li>

          <li className={style.nav_item}>
            <Link href="/my_servers" className={style.nav_link}>
              <Image src={server} alt='My Servers' width={image_size} height={image_size}/>
              <span className={style.link_text}>My Servers</span>
            </Link>
          </li>

          <li className={style.nav_item}>
            <Link href="/games" className={style.nav_link}>
              <Image src={games} alt='Games' width={image_size} height={image_size}/>
              <span className={style.link_text}>Games</span>
            </Link>
          </li>

          <li className={style.nav_item}>
            <Link href="/games/minecraft" className={style.nav_link}>
              <Image src={minecraft} alt='Minecraft' width={image_size} height={image_size}/>
              <span className={style.link_text}>Minecraft</span>
            </Link>
          </li>

          <li className={style.nav_item}>
            <Link href="/games/terraria" className={style.nav_link}>
              <Image src={terraria} alt='Terraria' width={image_size} height={image_size}/>
              <span className={style.link_text}>Terraria</span>
            </Link>
          </li>

          <div className={style.nav_last_item}>
            <li className={style.nav_item}>
              <Link href="/discord" className={style.nav_link}>
                <Image src={discord} alt='Discord' width={image_size} height={image_size}/>
                <span className={style.link_text}>Discord</span>
              </Link>
            </li>

            <li className={style.nav_item}>
              <Link href="/login" className={style.nav_link}>
                <Image src={login} alt='Login' width={image_size} height={image_size}/>
                <span className={style.link_text}>Login</span>
              </Link>
            </li>
          </div>

          </ul>
        </nav>
          <main>
          {children}
          </main>
      </body>
    </html>
  );
}
