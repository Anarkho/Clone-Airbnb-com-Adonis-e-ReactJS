import React from "react";
import { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Pin } from "./styles";

const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});

const Properties = ({ properties, match }) =>
  properties.map(property => (
    <Marker
      key={property.id}
      longitude={parseFloat(property.longitude)}
      latitude={parseFloat(property.latitude)}
    >
      <Pin>
        <Link to={`${match.url}/property/${property.id}`}>
          {intlMonetary.format(property.price)}
        </Link>
      </Pin>
    </Marker>
  ));

Properties.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.string,
      longitude: PropTypes.string,
      latitude: PropTypes.string,
      match: PropTypes.shape({
        url: PropTypes.string
      }).isRequired
    })
  ).isRequired
  
};

export default Properties;