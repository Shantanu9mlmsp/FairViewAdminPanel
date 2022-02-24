import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Flex
            gap="20px"
            direction="row"
            width="100%"
            justifyContent="center"
            alignItems="center"
            position="relative"
            padding="24px 32px 24px 32px"
            backgroundColor="rgba(255,255,255,1)"
            {...rest}
            {...getOverrideProps(overrides, "Flex")}
          >
            <Flex
              gap="32px"
              direction="row"
              width="1159px"
              justifyContent="flex-end"
              alignItems="center"
              grow="1"
              basis="1159px"
              height="45px"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Flex.Flex[1]")}
            >
              <Text
                fontFamily="Inter"
                fontSize="20px"
                fontWeight="400"
                color="rgba(0,0,0,1)"
                textTransform="capitalize"
                lineHeight="23.4375px"
                textAlign="left"
                display="flex"
                direction="column"
                justifyContent="flex-start"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                children="Car Rental App"
                {...getOverrideProps(overrides, "Flex.Flex[1].Text[0]")}
              ></Text>
              <Button
                gap="0"
                padding="8px 12px 8px 12px"
                display="flex"
                shrink="0"
                height="34px"
                size="small"
                variation="primary"
                children="Sign out"
                {...getOverrideProps(overrides, "Flex.Flex[1].Button[0]")}
              ></Button>
            </Flex>
          </Flex>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
           <li  className='nav-text'>
            <div className='admin-text'>{`Admin`}</div> 
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
