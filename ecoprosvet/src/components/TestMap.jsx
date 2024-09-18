import React, {memo} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const MapChart = ({setTooltipContent}) => {
    return (
        <div data-tip="" style={{backgroundColor: 'gray'}}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 20000,
                }}>
                <ZoomableGroup>
                    <Geographies
                        geography="https://raw.githubusercontent.com/zarkzork/russia-topojson/master/moscow.json">
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        setTooltipContent(`${geo.properties.name}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapChart;