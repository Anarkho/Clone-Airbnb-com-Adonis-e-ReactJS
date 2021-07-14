import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";

import debounce from "lodash/debounce";
import api from "../../services/api.js";

import Properties from './components/properties';

const TOKEN =
    "pk.eyJ1IjoiY2F2YWxlaXJvLXBhbGlkbyIsImEiOiJja3EwN2liMXgwMjc2MnBrMTIxYmx2bHVvIn0.9WE7jRWiEkPPpyq7pO0fSw";

class Map extends Component {
    static propTypes = {
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired
    };

    state = {
        viewport: {
            latitude: -23.385224734832722,
            longitude: -51.12732063792373,
            zoom: 14.8,
            bearing: 0,
            pitch: 0
        },
        properties: []
    };

    constructor() {
        super();
        this.updatePropertiesLocalization = debounce(
            this.updatePropertiesLocalization,
            500
        );
    }

    componentDidMount() {
        this.loadProperties();
    }

    updatePropertiesLocalization() {
        this.loadProperties();
    }

    loadProperties = async () => {
        const { latitude, longitude } = this.state.viewport;
        try {
            const response = await api.get("/properties", {
                params: { latitude, longitude }
            });
            this.setState({ properties: response.data });
        } catch (err) {
            console.log(err);
        }
    };


    render() {
        const { containerWidth: width, containerHeight: height } = this.props;
        const { properties } = this.state;
        return (
          <MapGL
            width={width}
            height={height}
            {...this.state.viewport}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={TOKEN}
            onViewportChange={viewport => this.setState({ viewport })}
            onViewStateChange={this.updatePropertiesLocalization.bind(this)}
          >
            <Properties properties={properties} />
          </MapGL>
        );
    }
}

const DimensionedMap = Dimensions()(Map);
const Main = () => (
    <Container>
        <DimensionedMap />
    </Container>
);

export default Main;