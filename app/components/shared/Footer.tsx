import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex max-[880px]:flex-col min-h-96 items-start max-[880px]:items-center max-sm:items-start justify-center gap-28 mt-10 text-sm font-medium cursor-pointer">
      <div className="flex gap-20 max-[880px]:w-96  max-[880px]:px-10">
        <div className="flex flex-col gap-5">
          <p>Countries</p>
          <p>Regions</p>
          <p>Cities</p>
          <p>Districts</p>
          <p>Airports</p>
        </div>
        <div className="flex flex-col gap-5">
          <p>Homes</p>
          <p>Apartments</p>
          <p>Resorts</p>
          <p>Villas</p>
          <p>Hostels</p>
          <p>Guest houses</p>
        </div>
      </div>
      <div className="flex gap-20 max-[880px]:px-10 max-[880px]:w-96">
        <div className="flex flex-col gap-5">
          <p> Unique places to stay</p>
          <p>Reviews</p>
          <p>Unpacked: Travel articles</p>
          <p>Travel communities</p>
          <p>Seasonal and holiday deals</p>
        </div>
        <div className="flex flex-col gap-5">
          <p>Car rental</p>
          <p>Flight Finder</p>
          <p>Restaurant reservations</p>
          <p>Travel Agents</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 max-[880px]:px-10">
        <p>Customer Service</p>
        <p>Partner Help</p>
        <p>Careers</p>
        <p>Sustainability</p>
        <p>Press Center</p>
        <p>Terms & conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
