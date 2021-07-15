import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { Container, ButtonContainer, PointReference } from "./styles";
import Button from "./components/Button";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";

import debounce from "lodash/debounce";
import api from "../../services/api.js";

import { withRouter } from "react-router-dom";

import { logout } from "../../services/auth";

import Properties from './components/Properties';

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
        properties: [],
        addActivate: false
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

    handleLogout = e => {
        logout();
        this.props.history.push("/");
    };

    renderActions() {
        return (
            <ButtonContainer>
                <Button
                    color="#fc6963"
                    onClick={() => this.setState({ addActivate: true })}
                >
                    <i className="fa fa-plus" />
                </Button>
                <Button color="#222" onClick={this.handleLogout}>
                    <i className="fa fa-times" />
                </Button>
            </ButtonContainer>
        );
    }

    renderButtonAdd() {
        return (
            this.state.addActivate && (
                <PointReference>
                    <i className="fa fa-map-marker" />
                    <div>
                        <button onClick={this.handleAddProperty} type="button">
                            Adicionar
                        </button>
                        <button
                            onClick={() => this.setState({ addActivate: false })}
                            className="cancel"
                        >
                            Cancelar
                        </button>
                    </div>
                </PointReference>
            )
        );
    }

    handleAddProperty = () => {
        const { match, history } = this.props;
        const { latitude, longitude } = this.state.viewport;
        history.push(
          `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
        );
        
        this.setState({ addActivate: false });
      };


    render() {
        const { containerWidth: width, containerHeight: height, match } = this.props;
        const { properties, addActivate } = this.state;
        return (
            <Fragment>
                <MapGL
                    width={width}
                    height={height}
                    {...this.state.viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={TOKEN}
                    onViewportChange={viewport => this.setState({ viewport })}
                    onViewStateChange={this.updatePropertiesLocalization.bind(this)}
                >
                  {!addActivate && <Properties match={match} properties={properties} />}
                </MapGL>
                {this.renderActions()}
                {this.renderButtonAdd()}
            </Fragment>
        );
    }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const Main = () => (
    <Container>
        <DimensionedMap />
    </Container>
);

export default Main;