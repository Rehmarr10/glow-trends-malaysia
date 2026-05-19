window.addEventListener("DOMContentLoaded", function () {

    var embedOptions = {
        actions: false,
        renderer: "svg"
    };

    var concernScale = {
        domain: ["Acne", "Dryness", "Dullness", "Pigmentation", "Sensitivity", "Wrinkles"],
        range: ["#b83280", "#d45087", "#f95d6a", "#ff7c43", "#a05195", "#665191"]
    };

    var channelScale = {
        domain: ["Shopee", "Lazada", "Watsons", "Guardian"],
        range: ["#ef476f", "#ff9f1c", "#118ab2", "#06d6a0"]
    };

    var productScale = {
        domain: ["Cleanser", "Serum", "Moisturizer", "Sunscreen", "Toner", "Essence", "Mask"],
        range: ["#4e79a7", "#59a14f", "#9c755f", "#edc948", "#76b7b2", "#af7aa1", "#e15759"]
    };

    var commonConfig = {
        background: "#ffffff",
        config: {
            view: {
                stroke: null
            },
            axis: {
                labelFont: "Arial",
                titleFont: "Arial",
                labelColor: "#2f1b26",
                titleColor: "#2f1b26",
                gridColor: "#f0dce7"
            },
            legend: {
                labelFont: "Arial",
                titleFont: "Arial",
                labelColor: "#2f1b26",
                titleColor: "#2f1b26"
            }
        }
    };

    var chart1 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_skincare_survey_large.csv"
        },

        mark: {
            type: "bar",
            cornerRadiusEnd: 6
        },

        encoding: {
            x: {
                field: "Main_Skin_Concern",
                type: "nominal",
                title: "Skin Concern",
                axis: {
                    labelAngle: -30
                }
            },

            y: {
                aggregate: "count",
                type: "quantitative",
                title: "Respondents"
            },

            color: {
                field: "Main_Skin_Concern",
                type: "nominal",
                title: "Skin Concern",
                scale: concernScale
            },

            tooltip: [
                {
                    field: "Main_Skin_Concern",
                    type: "nominal",
                    title: "Skin Concern"
                },
                {
                    aggregate: "count",
                    type: "quantitative",
                    title: "Respondents"
                }
            ]
        },

        width: 520,
        height: 310
    };

    var chart2 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_skincare_survey_large.csv"
        },

        mark: {
            type: "arc",
            innerRadius: 65,
            outerRadius: 120
        },

        encoding: {
            theta: {
                aggregate: "count",
                type: "quantitative"
            },

            color: {
                field: "Purchase_Channel",
                type: "nominal",
                title: "Purchase Channel",
                scale: channelScale
            },

            tooltip: [
                {
                    field: "Purchase_Channel",
                    type: "nominal",
                    title: "Purchase Channel"
                },
                {
                    aggregate: "count",
                    type: "quantitative",
                    title: "Respondents"
                }
            ]
        },

        width: 300,
        height: 260
    };

    var chart3 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        params: [
            {
                name: "categorySelect",
                select: {
                    type: "point",
                    fields: ["Product_Category"]
                },
                bind: "legend"
            }
        ],

        data: {
            url: "Data/malaysia_beauty_products_large.csv"
        },

        mark: {
            type: "circle",
            size: 90
        },

        encoding: {
            x: {
                field: "Price_RM",
                type: "quantitative",
                title: "Price (RM)"
            },

            y: {
                field: "Rating",
                type: "quantitative",
                title: "Rating"
            },

            color: {
                field: "Product_Category",
                type: "nominal",
                title: "Product Category",
                scale: productScale
            },

            opacity: {
                condition: {
                    param: "categorySelect",
                    value: 0.85
                },
                value: 0.15
            },

            tooltip: [
                {
                    field: "Brand",
                    type: "nominal",
                    title: "Brand"
                },
                {
                    field: "Product_Category",
                    type: "nominal",
                    title: "Category"
                },
                {
                    field: "Price_RM",
                    type: "quantitative",
                    title: "Price (RM)"
                },
                {
                    field: "Rating",
                    type: "quantitative",
                    title: "Rating"
                }
            ]
        },

        width: 320,
        height: 260
    };

    var chart4 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_skincare_survey_large.csv"
        },

        mark: "rect",

        encoding: {
            x: {
                field: "Region",
                type: "nominal",
                title: "Region",
                axis: {
                    labelAngle: -35
                }
            },

            y: {
                field: "Main_Skin_Concern",
                type: "nominal",
                title: "Skin Concern"
            },

            color: {
                aggregate: "count",
                type: "quantitative",
                title: "Respondents",
                scale: {
                    scheme: "redpurple"
                }
            },

            tooltip: [
                {
                    field: "Region",
                    type: "nominal",
                    title: "Region"
                },
                {
                    field: "Main_Skin_Concern",
                    type: "nominal",
                    title: "Skin Concern"
                },
                {
                    aggregate: "count",
                    type: "quantitative",
                    title: "Respondents"
                }
            ]
        },

        width: 620,
        height: 260
    };

    var malaysiaRegions = [
        {
            Region: "KL",
            Latitude: 3.1390,
            Longitude: 101.6869,
            Average_Spending_RM: 205,
            Respondents: 120
        },
        {
            Region: "Selangor",
            Latitude: 3.0738,
            Longitude: 101.5183,
            Average_Spending_RM: 218,
            Respondents: 150
        },
        {
            Region: "Johor",
            Latitude: 1.4927,
            Longitude: 103.7414,
            Average_Spending_RM: 220,
            Respondents: 135
        },
        {
            Region: "Penang",
            Latitude: 5.4164,
            Longitude: 100.3327,
            Average_Spending_RM: 217,
            Respondents: 125
        },
        {
            Region: "Perak",
            Latitude: 4.5975,
            Longitude: 101.0901,
            Average_Spending_RM: 221,
            Respondents: 130
        },
        {
            Region: "Negeri Sembilan",
            Latitude: 2.7258,
            Longitude: 101.9424,
            Average_Spending_RM: 220,
            Respondents: 110
        },
        {
            Region: "Sabah",
            Latitude: 5.9804,
            Longitude: 116.0735,
            Average_Spending_RM: 243,
            Respondents: 145
        },
        {
            Region: "Sarawak",
            Latitude: 1.5533,
            Longitude: 110.3592,
            Average_Spending_RM: 235,
            Respondents: 140
        }
    ];

    var chart5 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        width: 500,
        height: 330,

        projection: {
            type: "mercator",
            center: [109, 4],
            scale: 1150
        },

        layer: [
            {
                data: {
                    url: "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
                    format: {
                        type: "topojson",
                        feature: "countries"
                    }
                },

                transform: [
                    {
                        filter: "datum.id == 458"
                    }
                ],

                mark: {
                    type: "geoshape",
                    fill: "#ffe1ef",
                    stroke: "#9b2f64",
                    strokeWidth: 2
                }
            },

            {
                data: {
                    values: malaysiaRegions
                },

                mark: {
                    type: "circle",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    opacity: 0.9
                },

                encoding: {
                    longitude: {
                        field: "Longitude",
                        type: "quantitative"
                    },

                    latitude: {
                        field: "Latitude",
                        type: "quantitative"
                    },

                    size: {
                        field: "Respondents",
                        type: "quantitative",
                        title: "Respondents",
                        scale: {
                            range: [90, 550]
                        },
                        legend: {
                            orient: "bottom",
                            columns: 4
                        }
                    },

                    color: {
                        field: "Average_Spending_RM",
                        type: "quantitative",
                        title: "Average Spending RM",
                        scale: {
                            scheme: "reds"
                        },
                        legend: {
                            orient: "bottom"
                        }
                    },

                    tooltip: [
                        {
                            field: "Region",
                            type: "nominal",
                            title: "Region"
                        },
                        {
                            field: "Average_Spending_RM",
                            type: "quantitative",
                            title: "Average Spending RM"
                        },
                        {
                            field: "Respondents",
                            type: "quantitative",
                            title: "Respondents"
                        }
                    ]
                }
            }
        ]
    };

    var chart6 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_beauty_products_large.csv"
        },

        mark: {
            type: "bar",
            cornerRadiusEnd: 4
        },

        encoding: {
            x: {
                field: "Platform",
                type: "nominal",
                title: "Platform"
            },

            y: {
                aggregate: "count",
                type: "quantitative",
                title: "Products"
            },

            color: {
                field: "Product_Category",
                type: "nominal",
                title: "Product Category",
                scale: productScale
            },

            tooltip: [
                {
                    field: "Platform",
                    type: "nominal",
                    title: "Platform"
                },
                {
                    field: "Product_Category",
                    type: "nominal",
                    title: "Product Category"
                },
                {
                    aggregate: "count",
                    type: "quantitative",
                    title: "Products"
                }
            ]
        },

        width: 320,
        height: 260
    };

    var chart7 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_skincare_survey_large.csv"
        },

        mark: {
            type: "bar",
            cornerRadiusEnd: 6
        },

        encoding: {
            y: {
                field: "Preferred_Product",
                type: "nominal",
                title: "Product Type",
                sort: "-x"
            },

            x: {
                aggregate: "count",
                type: "quantitative",
                title: "Respondents"
            },

            color: {
                field: "Preferred_Product",
                type: "nominal",
                title: "Product Type",
                scale: productScale
            },

            tooltip: [
                {
                    field: "Preferred_Product",
                    type: "nominal",
                    title: "Product Type"
                },
                {
                    aggregate: "count",
                    type: "quantitative",
                    title: "Respondents"
                }
            ]
        },

        width: 320,
        height: 260
    };

    var chart8 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_skincare_survey_large.csv"
        },

        mark: {
            type: "line",
            point: {
                filled: true,
                size: 90
            },
            strokeWidth: 3,
            color: "#c94f8a"
        },

        encoding: {
            x: {
                field: "Age_Group",
                type: "ordinal",
                title: "Age Group",
                sort: ["18-24", "25-34", "35-44", "45-54", "55+"]
            },

            y: {
                field: "Monthly_Spending_RM",
                aggregate: "mean",
                type: "quantitative",
                title: "Average Monthly Spending RM"
            },

            tooltip: [
                {
                    field: "Age_Group",
                    type: "ordinal",
                    title: "Age Group"
                },
                {
                    field: "Monthly_Spending_RM",
                    aggregate: "mean",
                    type: "quantitative",
                    title: "Average Monthly Spending RM"
                }
            ]
        },

        width: 320,
        height: 260
    };

    var chart9 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_beauty_products_large.csv"
        },

        mark: {
            type: "bar",
            cornerRadiusEnd: 6,
            color: "#c94f8a"
        },

        encoding: {
            y: {
                field: "Brand",
                type: "nominal",
                title: "Brand",
                sort: "-x"
            },

            x: {
                field: "Number_of_Reviews",
                aggregate: "sum",
                type: "quantitative",
                title: "Total Reviews"
            },

            tooltip: [
                {
                    field: "Brand",
                    type: "nominal",
                    title: "Brand"
                },
                {
                    field: "Number_of_Reviews",
                    aggregate: "sum",
                    type: "quantitative",
                    title: "Total Reviews"
                }
            ]
        },

        width: 320,
        height: 280
    };

    var chart10 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,

        data: {
            url: "Data/malaysia_beauty_products_large.csv"
        },

        mark: {
            type: "boxplot",
            extent: "min-max"
        },

        encoding: {
            x: {
                field: "Product_Category",
                type: "nominal",
                title: "Product Category",
                axis: {
                    labelAngle: -35
                }
            },

            y: {
                field: "Price_RM",
                type: "quantitative",
                title: "Product Price RM"
            },

            color: {
                field: "Product_Category",
                type: "nominal",
                title: "Product Category",
                scale: productScale
            },

            tooltip: [
                {
                    field: "Product_Category",
                    type: "nominal",
                    title: "Product Category"
                },
                {
                    field: "Price_RM",
                    type: "quantitative",
                    title: "Product Price RM"
                }
            ]
        },

        width: 320,
        height: 260
    };

    vegaEmbed("#chart1", chart1, embedOptions);
    vegaEmbed("#chart2", chart2, embedOptions);
    vegaEmbed("#chart3", chart3, embedOptions);
    vegaEmbed("#chart4", chart4, embedOptions);
    vegaEmbed("#chart5", chart5, embedOptions);
    vegaEmbed("#chart6", chart6, embedOptions);
    vegaEmbed("#chart7", chart7, embedOptions);
    vegaEmbed("#chart8", chart8, embedOptions);
    vegaEmbed("#chart9", chart9, embedOptions);
    vegaEmbed("#chart10", chart10, embedOptions);

    var themeButton = document.getElementById("themeToggle");

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    });

});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}