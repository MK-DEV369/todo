"use client";
import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from '@/app/context/globalProvider';
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { ListTodo, LogOut } from "lucide-react";
import Image from "next/image";

function Sidebar() {
  const { theme, toggleTheme } = useContext(GlobalContext);
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { firstName, imageUrl } = user || {
    firstName: "",
    imageUrl: "",
  };

  const handleClick = (link: string) => {
    router.push(link);
  };

  const handleIconClick = () => {
    router.push("/");
  };


  return (
    <SidebarStyled theme={theme} key={theme.name}>

      <div className="profile">

        <div className="icon-container">
          <button onClick={handleIconClick}><ListTodo color={theme.iconColor} width={60} height={60} /></button>
        </div>

        <div className="profile-overlay"></div>
        <SignedOut><SignInButton /><SignUpButton /></SignedOut>
        <SignedIn>
        <div className="image">
          {imageUrl && (
            <Image
              width={60}
              height={60}
              src={imageUrl}
              alt="profile"
              priority={true}
            />
          )}
        </div>
        <div className="user-btn">
          <UserButton />
        </div>
        </SignedIn>
      </div>

      <div className=" text-lg px-5">
        Welcome! {firstName}
      </div>


      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {React.cloneElement(item.icon, { color: theme.iconColor })}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>

      <div className="footer">
        <div className="footer-overlay">
          <Button
            type="button"
            padding="0.4rem 0.8rem"
            borderRad="0.8rem"
            fw="500"
            fs="1.2rem"
            icon={theme.icon}
            click={toggleTheme}
          />
        </div>
        <div className="footer-overlay">
          <Button
            type={"submit"}
            padding={"0.4rem 0.8rem"}
            borderRad={"0.8rem"}
            fw={"500"}
            fs={"1.2rem"}
            icon={< LogOut color={theme.iconColor} />}
            click={() => {
              signOut(() => router.push("/signin"));
            }}
          />
        </div>
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
  position: fixed;
  top:0;
  left:0;
  bottom: 0;
  width: 18rem;
  background-color: ${(props) => props.theme.colorBg2};
  color: ${(props) => props.theme.iconColor};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  margin: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
  .user-btn {
    position: absolute;
    z-index: 20;
    top: 0;
    width: 100%;
    height: 100%;
    
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.borderColor};
    

    .icon-container {
      width: auto;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }

    .image {
      display: inline-block;
      transition: all 0.5s ease;
      border-radius: 100%;
      position: relative;
      z-index: 1;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }
    
    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.5;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.iconColor};
      z-index: 2;
   }

    &::after {      
      z-index: 1;
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons1};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  .footer {
    position: relative;
    margin: 2rem;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500; 
    color: ${(props) => props.theme.borderColor};

    .footer-overlay {
      border: 2px solid ${(props) => props.theme.borderColor};
      border-radius: 0.75rem;
      bottom: 0;
      left: 0;
      width: fit-content;
      height: fit-content;
      transition: all 0.55s linear;
      opacity: 0.5;

      &:hover {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
        transform: scale(1.1);
      }
    }
    
  }
`;

export default Sidebar;
