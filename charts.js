window.addEventListener("DOMContentLoaded", function () {
    var embedOptions = { actions: false, renderer: "svg" };

    var concernScale = {
        domain: ["Acne", "Dryness", "Dullness", "Pigmentation", "Sensitivity", "Wrinkles"],
        range: ["#b83280", "#845ec2", "#ff9f9f", "#f7b267", "#4d96ff", "#c77dff"]
    };

    var channelScale = {
        domain: ["Shopee", "Lazada", "Watsons", "Guardian"],
        range: ["#c94f8a", "#845ec2", "#4d96ff", "#f7b267"]
    };

    var productScale = {
        domain: ["Cleanser", "Serum", "Moisturizer", "Sunscreen", "Toner", "Essence", "Mask"],
        range: ["#4d96ff", "#845ec2", "#c94f8a", "#f7b267", "#6c63ff", "#d16ba5", "#ff9f9f"]
    };

    var commonConfig = {
        background: "#ffffff",
        config: {
            view: { stroke: null },
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
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        transform: [
            { aggregate: [{ op: "count", as: "Respondents" }], groupby: ["Main_Skin_Concern"] }
        ],
        mark: { type: "circle", opacity: 0.85, stroke: "#ffffff", strokeWidth: 2 },
        encoding: {
            x: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern", axis: { labelAngle: -25 } },
            y: { field: "Respondents", type: "quantitative", title: "Respondents" },
            size: { field: "Respondents", type: "quantitative", title: "Respondents", scale: { range: [700, 4000] } },
            color: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern", scale: concernScale },
            tooltip: [
                { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
                { field: "Respondents", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 620,
        height: 300
    };

    var chart2 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        transform: [
            { aggregate: [{ op: "count", as: "Respondents" }], groupby: ["Purchase_Channel"] },
            { joinaggregate: [{ op: "sum", field: "Respondents", as: "Total" }] },
            { calculate: "datum.Respondents / datum.Total", as: "Percentage" },
            { calculate: "datum.Purchase_Channel + '  ' + format(datum.Percentage, '.1%')", as: "Label" }
        ],
        hconcat: [
            {
                width: 300,
                height: 280,
                mark: { type: "arc", innerRadius: 75, outerRadius: 125, stroke: "#ffffff", strokeWidth: 3 },
                encoding: {
                    theta: { field: "Respondents", type: "quantitative" },
                    color: { field: "Purchase_Channel", type: "nominal", title: "Purchase Channel", scale: channelScale },
                    tooltip: [
                        { field: "Purchase_Channel", type: "nominal", title: "Purchase Channel" },
                        { field: "Respondents", type: "quantitative", title: "Respondents" },
                        { field: "Percentage", type: "quantitative", title: "Percentage", format: ".1%" }
                    ]
                }
            },
            {
                width: 170,
                height: 280,
                mark: { type: "text", align: "left", fontSize: 15, fontWeight: "bold" },
                encoding: {
                    y: { field: "Purchase_Channel", type: "nominal", axis: null },
                    text: { field: "Label", type: "nominal" },
                    color: { field: "Purchase_Channel", type: "nominal", scale: channelScale, legend: null }
                }
            }
        ]
    };

    var chart3 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        transform: [
            { aggregate: [{ op: "mean", field: "Rating", as: "Average_Rating" }], groupby: ["Product_Category"] },
            { calculate: "3", as: "Base" }
        ],
        layer: [
            {
                mark: { type: "rule", strokeWidth: 4, color: "#d8b4f8" },
                encoding: {
                    y: { field: "Product_Category", type: "nominal", sort: "-x", title: "Product Category" },
                    x: { field: "Base", type: "quantitative", scale: { domain: [3, 5] }, title: "Average Rating" },
                    x2: { field: "Average_Rating" }
                }
            },
            {
                mark: { type: "circle", size: 300, stroke: "#ffffff", strokeWidth: 2 },
                encoding: {
                    y: { field: "Product_Category", type: "nominal", sort: "-x" },
                    x: { field: "Average_Rating", type: "quantitative", scale: { domain: [3, 5] } },
                    color: { field: "Product_Category", type: "nominal", scale: productScale },
                    tooltip: [
                        { field: "Product_Category", type: "nominal", title: "Product Category" },
                        { field: "Average_Rating", type: "quantitative", title: "Average Rating", format: ".2f" }
                    ]
                }
            }
        ],
        width: 340,
        height: 260
    };

    var chart4 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: "rect",
        encoding: {
            x: { field: "Region", type: "nominal", title: "Region", axis: { labelAngle: -35 } },
            y: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
            color: { aggregate: "count", type: "quantitative", title: "Respondents", scale: { scheme: "purples" } },
            tooltip: [
                { field: "Region", type: "nominal", title: "Region" },
                { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
                { aggregate: "count", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 720,
        height: 280
    };


window.addEventListener("DOMContentLoaded", function () {

    var embedOptions = { actions: false, renderer: "svg" };

    var concernScale = {
        domain: ["Acne", "Dryness", "Dullness", "Pigmentation", "Sensitivity", "Wrinkles"],
        range: ["#b83280", "#845ec2", "#ff9f9f", "#f7b267", "#4d96ff", "#c77dff"]
    };

    var channelScale = {
        domain: ["Shopee", "Lazada", "Watsons", "Guardian"],
        range: ["#c94f8a", "#845ec2", "#4d96ff", "#f7b267"]
    };

    var productScale = {
        domain: ["Cleanser", "Serum", "Moisturizer", "Sunscreen", "Toner", "Essence", "Mask"],
        range: ["#4d96ff", "#845ec2", "#c94f8a", "#f7b267", "#6c63ff", "#d16ba5", "#ff9f9f"]
    };

    var commonConfig = {
        background: "#ffffff",
        config: {
            view: { stroke: null },
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
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        transform: [
            { aggregate: [{ op: "count", as: "Respondents" }], groupby: ["Main_Skin_Concern"] }
        ],
        mark: { type: "circle", opacity: 0.85, stroke: "#ffffff", strokeWidth: 2 },
        encoding: {
            x: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern", axis: { labelAngle: -25 } },
            y: { field: "Respondents", type: "quantitative", title: "Respondents" },
            size: { field: "Respondents", type: "quantitative", title: "Respondents", scale: { range: [700, 4000] } },
            color: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern", scale: concernScale },
            tooltip: [
                { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
                { field: "Respondents", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 620,
        height: 300
    };

    var chart2 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        transform: [
            { aggregate: [{ op: "count", as: "Respondents" }], groupby: ["Purchase_Channel"] },
            { joinaggregate: [{ op: "sum", field: "Respondents", as: "Total" }] },
            { calculate: "datum.Respondents / datum.Total", as: "Percentage" },
            { calculate: "datum.Purchase_Channel + '  ' + format(datum.Percentage, '.1%')", as: "Label" }
        ],
        hconcat: [
            {
                width: 300,
                height: 280,
                mark: { type: "arc", innerRadius: 75, outerRadius: 125, stroke: "#ffffff", strokeWidth: 3 },
                encoding: {
                    theta: { field: "Respondents", type: "quantitative" },
                    color: { field: "Purchase_Channel", type: "nominal", title: "Purchase Channel", scale: channelScale },
                    tooltip: [
                        { field: "Purchase_Channel", type: "nominal", title: "Purchase Channel" },
                        { field: "Respondents", type: "quantitative", title: "Respondents" },
                        { field: "Percentage", type: "quantitative", title: "Percentage", format: ".1%" }
                    ]
                }
            },
            {
                width: 170,
                height: 280,
                mark: { type: "text", align: "left", fontSize: 15, fontWeight: "bold" },
                encoding: {
                    y: { field: "Purchase_Channel", type: "nominal", axis: null },
                    text: { field: "Label", type: "nominal" },
                    color: { field: "Purchase_Channel", type: "nominal", scale: channelScale, legend: null }
                }
            }
        ]
    };

    var chart3 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        transform: [
            { aggregate: [{ op: "mean", field: "Rating", as: "Average_Rating" }], groupby: ["Product_Category"] },
            { calculate: "3", as: "Base" }
        ],
        layer: [
            {
                mark: { type: "rule", strokeWidth: 4, color: "#d8b4f8" },
                encoding: {
                    y: { field: "Product_Category", type: "nominal", sort: "-x", title: "Product Category" },
                    x: { field: "Base", type: "quantitative", scale: { domain: [3, 5] }, title: "Average Rating" },
                    x2: { field: "Average_Rating" }
                }
            },
            {
                mark: { type: "circle", size: 300, stroke: "#ffffff", strokeWidth: 2 },
                encoding: {
                    y: { field: "Product_Category", type: "nominal", sort: "-x" },
                    x: { field: "Average_Rating", type: "quantitative", scale: { domain: [3, 5] } },
                    color: { field: "Product_Category", type: "nominal", scale: productScale },
                    tooltip: [
                        { field: "Product_Category", type: "nominal", title: "Product Category" },
                        { field: "Average_Rating", type: "quantitative", title: "Average Rating", format: ".2f" }
                    ]
                }
            }
        ],
        width: 340,
        height: 260
    };

    var chart4 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: "rect",
        encoding: {
            x: { field: "Region", type: "nominal", title: "Region", axis: { labelAngle: -35 } },
            y: { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
            color: { aggregate: "count", type: "quantitative", title: "Respondents", scale: { scheme: "purples" } },
            tooltip: [
                { field: "Region", type: "nominal", title: "Region" },
                { field: "Main_Skin_Concern", type: "nominal", title: "Skin Concern" },
                { aggregate: "count", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 720,
        height: 280
    };

var chart5 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    ...commonConfig,

    width: 760,
    height: 430,

    data: {
        values: [
            {Region:"Penang", Spending:217, x:1, y:1},
            {Region:"Perak", Spending:221, x:2, y:1},
            {Region:"Selangor", Spending:218, x:2, y:2},
            {Region:"KL", Spending:205, x:3, y:2},
            {Region:"Negeri Sembilan", Spending:220, x:3, y:3},
            {Region:"Johor", Spending:220, x:4, y:3},
            {Region:"Sarawak", Spending:235, x:7, y:3},
            {Region:"Sabah", Spending:243, x:8, y:2}
        ]
    },

    layer: [
        {
            mark: {
                type: "rect",
                cornerRadius: 28,
                stroke: "#ffffff",
                strokeWidth: 5,
                opacity: 0.95
            },
            encoding: {
                x: { field: "x", type: "ordinal", axis: null },
                y: { field: "y", type: "ordinal", axis: null },
                color: {
                    field: "Spending",
                    type: "quantitative",
                    title: "Average Spending RM",
                    scale: {
                        domain: [205, 243],
                        range: ["#f7b267", "#d64f93", "#845ec2"]
                    }
                },
                tooltip: [
                    { field: "Region", type: "nominal", title: "Region" },
                    { field: "Spending", type: "quantitative", title: "Average Spending RM" }
                ]
            }
        },
        {
            mark: {
                type: "text",
                font: "Arial",
                fontSize: 15,
                fontWeight: "bold",
                fill: "white"
            },
            encoding: {
                x: { field: "x", type: "ordinal", axis: null },
                y: { field: "y", type: "ordinal", axis: null },
                text: { field: "Region", type: "nominal" }
            }
        }
    ],

    config: {
        view: { stroke: null },
        legend: {
            orient: "bottom",
            direction: "horizontal",
            titleFontSize: 13,
            labelFontSize: 12
        }
    }
};
    var chart6 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 4 },
        encoding: {
            x: { field: "Platform", type: "nominal", title: "Platform" },
            y: { aggregate: "count", type: "quantitative", title: "Products" },
            color: { field: "Product_Category", type: "nominal", title: "Product Category", scale: productScale },
            tooltip: [
                { field: "Platform", type: "nominal", title: "Platform" },
                { field: "Product_Category", type: "nominal", title: "Product Category" },
                { aggregate: "count", type: "quantitative", title: "Products" }
            ]
        },
        width: 720,
        height: 300
    };

    var chart7 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 6 },
        encoding: {
            y: { field: "Preferred_Product", type: "nominal", title: "Product Type", sort: "-x" },
            x: { aggregate: "count", type: "quantitative", title: "Respondents" },
            color: { field: "Preferred_Product", type: "nominal", title: "Product Type", scale: productScale },
            tooltip: [
                { field: "Preferred_Product", type: "nominal", title: "Product Type" },
                { aggregate: "count", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 340,
        height: 260
    };

    var chart8 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: { type: "line", point: { filled: true, size: 90 }, strokeWidth: 3, color: "#c94f8a" },
        encoding: {
            x: { field: "Age_Group", type: "ordinal", title: "Age Group", sort: ["18-24", "25-34", "35-44", "45+"] },
            y: {
                field: "Monthly_Spending_RM",
                aggregate: "mean",
                type: "quantitative",
                title: "Average Monthly Spending RM"
            },
            tooltip: [
                { field: "Age_Group", type: "ordinal", title: "Age Group" },
                { field: "Monthly_Spending_RM", aggregate: "mean", type: "quantitative", title: "Average Monthly Spending RM", format: ".2f" }
            ]
        },
        width: 340,
        height: 260
    };

    var chart9 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 6, color: "#c94f8a" },
        encoding: {
            y: { field: "Brand", type: "nominal", title: "Brand", sort: "-x" },
            x: { field: "Number_of_Reviews", aggregate: "sum", type: "quantitative", title: "Total Reviews" },
            tooltip: [
                { field: "Brand", type: "nominal", title: "Brand" },
                { field: "Number_of_Reviews", aggregate: "sum", type: "quantitative", title: "Total Reviews" }
            ]
        },
        width: 340,
        height: 250
    };

    var chart10 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "boxplot", extent: "min-max", size: 28 },
        encoding: {
            x: { field: "Product_Category", type: "nominal", title: "Product Category", axis: { labelAngle: -35 } },
            y: { field: "Price_RM", type: "quantitative", title: "Product Price RM" },
            color: { field: "Product_Category", type: "nominal", title: "Product Category", scale: productScale },
            tooltip: [
                { field: "Product_Category", type: "nominal", title: "Product Category" },
                { field: "Price_RM", type: "quantitative", title: "Product Price RM" }
            ]
        },
        width: 340,
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
        themeButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}   

    var chart6 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 4 },
        encoding: {
            x: { field: "Platform", type: "nominal", title: "Platform" },
            y: { aggregate: "count", type: "quantitative", title: "Products" },
            color: { field: "Product_Category", type: "nominal", title: "Product Category", scale: productScale },
            tooltip: [
                { field: "Platform", type: "nominal", title: "Platform" },
                { field: "Product_Category", type: "nominal", title: "Product Category" },
                { aggregate: "count", type: "quantitative", title: "Products" }
            ]
        },
        width: 720,
        height: 300
    };

    var chart7 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 6 },
        encoding: {
            y: { field: "Preferred_Product", type: "nominal", title: "Product Type", sort: "-x" },
            x: { aggregate: "count", type: "quantitative", title: "Respondents" },
            color: { field: "Preferred_Product", type: "nominal", title: "Product Type", scale: productScale },
            tooltip: [
                { field: "Preferred_Product", type: "nominal", title: "Product Type" },
                { aggregate: "count", type: "quantitative", title: "Respondents" }
            ]
        },
        width: 340,
        height: 260
    };

    var chart8 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_skincare_survey_large.csv" },
        mark: { type: "line", point: { filled: true, size: 90 }, strokeWidth: 3, color: "#c94f8a" },
        encoding: {
            x: { field: "Age_Group", type: "ordinal", title: "Age Group", sort: ["18-24", "25-34", "35-44", "45+"] },
            y: {
                field: "Monthly_Spending_RM",
                aggregate: "mean",
                type: "quantitative",
                title: "Average Monthly Spending RM"
            },
            tooltip: [
                { field: "Age_Group", type: "ordinal", title: "Age Group" },
                {
                    field: "Monthly_Spending_RM",
                    aggregate: "mean",
                    type: "quantitative",
                    title: "Average Monthly Spending RM",
                    format: ".2f"
                }
            ]
        },
        width: 340,
        height: 260
    };

    var chart9 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "bar", cornerRadiusEnd: 6, color: "#c94f8a" },
        encoding: {
            y: { field: "Brand", type: "nominal", title: "Brand", sort: "-x" },
            x: { field: "Number_of_Reviews", aggregate: "sum", type: "quantitative", title: "Total Reviews" },
            tooltip: [
                { field: "Brand", type: "nominal", title: "Brand" },
                { field: "Number_of_Reviews", aggregate: "sum", type: "quantitative", title: "Total Reviews" }
            ]
        },
        width: 340,
        height: 250
    };

    var chart10 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        ...commonConfig,
        data: { url: "Data/malaysia_beauty_products_large.csv" },
        mark: { type: "boxplot", extent: "min-max", size: 28 },
        encoding: {
            x: { field: "Product_Category", type: "nominal", title: "Product Category", axis: { labelAngle: -35 } },
            y: { field: "Price_RM", type: "quantitative", title: "Product Price RM" },
            color: { field: "Product_Category", type: "nominal", title: "Product Category", scale: productScale },
            tooltip: [
                { field: "Product_Category", type: "nominal", title: "Product Category" },
                { field: "Price_RM", type: "quantitative", title: "Product Price RM" }
            ]
        },
        width: 340,
        height: 260
    };

    vegaEmbed("#chart1", chart1, embedOptions);
    vegaEmbed("#chart2", chart2, embedOptions);
    vegaEmbed("#chart3", chart3, embedOptions);
    vegaEmbed("#chart4", chart4, embedOptions);
    
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
