import { bscChain, polyChain } from "./chainchange";
import Link from "next/link";
import "sf-font";
import { Col, Dropdown } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile(props) {
  console.log("propspropspropspropsprops", props);
  const router = useRouter();

  useEffect(() => {
    if (!props?.wallet) {
      router.push("/");
    }
  }, []);

  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  async function enableChain() {
    var bsc = "Binance Smart Chain";
    var poly = "Polygon";

    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } 
  }
  const blockImage = React.useMemo(() => {
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";

    var init = "Set Network";
     if (selectedValue == bsc) {
      return <img src="./bsc.png" width={"110px"} />;
    } else if (selectedValue == pol) {
      return <img src="./polygonwhite.png" width={"110px"} />;
    } else if (selectedValue == init) {
      return (
        <div className="mt">
          <h6>Profile</h6>
        </div>
      );
    }
  });
  useEffect(() => {
    enableChain();
  }, [selected]);
  return (
    <Col css={{ marginTop: "$2" }}>
      <li>
        <Link
          href={"/author/" + props?.wallet}
         
        >
          <span className="me-1">
            <i className="icofont-user-alt-6"></i>
          </span>
          Profile
        </Link>
      </li>
    </Col>
  );
}
