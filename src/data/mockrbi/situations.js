const situations = [
  // {
  //   id: 0,
  //   name: "Asian financial crisis (1997-1998)",
  //   situation:
  //     "The Asian Financial Crisis, which occurred in 1997-1998, was a severe economic downturn that primarily affected Southeast Asian countries like Thailand, Indonesia, and South Korea. It resulted from currency devaluations, excessive borrowing, and financial instability, leading to economic contractions, bankruptcies, and social unrest. The crisis had global repercussions, causing a worldwide decline in investor confidence and impacting international markets.",
  //   choices: [
  //     "Financial Sector Support",
  //     "Currency Interventions",
  //     "Fiscal Measures",
  //   ],
  //   // Save , loan
  //   options: [
  //     {
  //       choice: "Financial Sector Support",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Currency Interventions",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Fiscal Measures",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 1,
  //   name: "Japanese Lost Decade",
  //   situation:
  //     "The Japanese Lost Decade refers to the 1990s when Japan experienced a prolonged economic stagnation marked by asset price deflation and slow growth. It resulted from a burst economic bubble and excessive debt. While the impact was primarily on Japan, it served as a cautionary tale for policymakers globally, highlighting the challenges of managing economic downturns and deflation.",
  //   choices: ["Fiscal Policies","Bank bailouts"],
  //   // Save , loan
  //   options: [
  //     {
  //       choice: "Fiscal Policies",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Fiscal Policies",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Bank bailouts",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "Zimbabwe Hyperinflation (2000s)",
  //   situation:
  //     "Zimbabwe experienced hyperinflation in the 2000s, with annual inflation rates reaching astronomical levels, such as 89.7 sextillion percent in November 2008. This crisis resulted from factors like economic mismanagement and land reform policies. It caused severe economic collapse, poverty, and a mass exodus of citizens. The world witnessed the devastating consequences of hyperinflation on a nation's stability and well-being.",
  //   choices: [
  //     "Stablization Efforts",
  //     "International Assistance",
  //     "No Substantial Impact",
  //   ],
  //   options: [
  //     {
  //       choice: "Stablization Efforts",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "International Assistance",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "No Substantial Impact",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "",
  //   situation:
  //     "The 2001 economic crisis in Argentina was a severe financial collapse marked by a debt default, currency devaluation, and widespread protests. It resulted in a deep recession, high unemployment, and widespread poverty in Argentina. While its direct global impact was limited, it highlighted the risks of unsustainable debt and economic mismanagement in emerging markets.",
  //   choices: [
  //     "Currency Interventions",
  //     "No Substantial Impact",
  //     "Debt Restructuring",
  //   ],
  //   options: [
  //     {
  //       choice: "Currency Interventions",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "No Substantial Impact",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Debt Restructuring",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: "2008 Financial Crisis",
  //   situation:
  //     "The 2008 financial crisis was a global economic meltdown triggered by the collapse of major financial institutions and a housing market crash in the United States. It led to a severe worldwide recession, with widespread unemployment, bank failures, and a global credit crunch. Governments implemented massive bailouts and stimulus packages to stabilize economies.",
  //   choices: [
  //     "Interest Rate Adjustment",
  //     "Fiscal Stimulus",
  //     "Quantitative Easing (QE)",
  //   ],
  //   options: [
  //     {
  //       choice: "Interest Rate Adjustment",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Fiscal Stimulus",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Quantitative Easing (QE)",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   name: "European debt crisis ( 2010s)",
  //   situation:
  //     "The European debt crisis of the 2010s was a financial turmoil primarily affecting countries in the Eurozone, such as Greece, Spain, and Portugal. It resulted from excessive government debt, economic instability, and banking issues. The crisis had a global impact, causing market volatility, economic slowdowns, and prompting austerity measures in affected nations.",
  //   choices: [
  //     "Enhanced Regulatory Measures",
  //     "Unconventional Monetary Policy",
  //     "Currency Interventions",
  //   ],
  //   options: [
  //     {
  //       choice: "Enhanced Regulatory Measures",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Unconventional Monetary Policy",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Currency Interventions",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: "",
  //   situation:
  //     "In 2013, India faced a rupee depreciation crisis due to a large current account deficit and capital outflows. The Indian rupee's value sharply declined against the US dollar, leading to higher inflation and economic uncertainty. While it primarily affected India, it also contributed to concerns about emerging market vulnerabilities in the global economy.",

  //   choices: [
  //     "No Substantial Impact",
  //     "Currency Interventions",
  //     "Trade Diversification",
  //   ],

  //   options: [
  //     {
  //       choice: "No Substantial Impact",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Currency Interventions",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Trade Diversification",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   name: "COVID-19 pandemic",
  //   situation:
  //     "The COVID-19 pandemic triggered a severe global recession in 2020, causing widespread economic disruptions, job losses, and financial market volatility. Lockdowns and supply chain interruptions significantly impacted businesses, leading to negative GDP growth across many countries, and central banks and governments implemented extensive stimulus measures to mitigate the economic fallout.",
  //     choices: ["Interest Rate Adjustments","Direct Financial Support","Food Security Measures"],
  //   options: [
  //     {
  //       choice: "Interest Rate Adjustments",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Direct Financial Support",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Food Security Measures",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   name: "Brazilian Economic Crisis (Ongoing)",
  //   situation:
  //     "The ongoing Brazilian economic crisis, marked by recession, high unemployment, and political instability, has impacted global markets. Brazil's economic struggles have dampened investor confidence, affecting international trade and investment. Falling commodity prices, corruption scandals, and fiscal challenges have contributed. The crisis underscores the interconnectedness of economies, influencing global economic sentiment and trade dynamics.",
  //   choices: ["Economic Reforms", "Currency Interventions","Risk Assessments"],
  //   options: [
  //     {
  //       choice: "Economic Reforms",
  //       tag: "emerging",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Currency Interventions",
  //       tag: "lessDeveloped",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //     {
  //       choice: "Risk Assessments",
  //       tag: "developed",
  //       impact: "10%",
  //       impactStatus: "+",
  //     },
  //   ],
  // },

    {
      "id": 1,
      "situation": "India’s inflation rate has surged to 7.5%, driven by high energy costs and strong consumer demand. At the same time, GDP growth is slowing, and businesses warn that higher interest rates could lead to job losses. The RBI must decide how to balance inflation control with economic stability.",
      "name": "Inflation and Economic Stability Decision",
      "options": [
        { "choice": "Raise the repo rate by 50 basis points.", "impact": 10 },
        { "choice": "Gradually reduce liquidity through bond sales.", "impact": 5 },
        { "choice": "Do nothing, assuming inflation will stabilize itself.", "impact": -5 },
        { "choice": "Cut interest rates to stimulate growth.", "impact": -10 }
      ]
    },
    {
      "id": 2,
      "situation": "Global crude oil prices have spiked by 40% due to geopolitical tensions, leading to higher fuel costs in India. This has pushed transportation costs up, causing a ripple effect on food and essential goods prices. The public struggles with rising expenses, and the government seeks RBI’s intervention.",
      "name": "Oil Price Shock and Inflation Control",
      "options": [
        { "choice": "Increase interest rates by 25 basis points.", "impact": 5 },
        { "choice": "Temporarily cap fuel prices through subsidies.", "impact": -5 },
        { "choice": "Use forex reserves to stabilize the rupee and reduce import costs.", "impact": 10 },
        { "choice": "Print more money to offset the price rise.", "impact": -10 }
      ]
    },
    {
      "id": 3,
      "situation": "Non-performing assets (NPAs) have reached 10% of total loans due to defaults by large corporate borrowers. Banks are hesitant to lend, fearing further defaults, which is slowing economic growth. The RBI must decide on a policy response.",
      "name": "Banking Crisis and NPA Resolution",
      "options": [
        { "choice": "Implement a targeted bad loan resolution framework.", "impact": 10 },
        { "choice": "Inject liquidity into the banking system.", "impact": 5 },
        { "choice": "Force banks to write off bad loans.", "impact": -5 },
        { "choice": "Ignore the problem, assuming banks will recover over time.", "impact": -10 }
      ]
    },
    {
      "id": 4,
      "situation": "A large urban cooperative bank is on the verge of bankruptcy due to mismanagement and bad loans. Depositors are panicking, and a bank run is happening. If not managed properly, trust in smaller banks may erode.",
      "name": "Cooperative Bank Failure",
      "options": [
        { "choice": "Impose a withdrawal limit while assessing the situation.", "impact": 5 },
        { "choice": "Let the bank fail, assuming deposit insurance will protect depositors.", "impact": -5 },
        { "choice": "Bail out the bank using public funds without reforms.", "impact": -10 },
        { "choice": "Merge it with a stronger bank under RBI supervision.", "impact": 10 }
      ]
    },
    {
      "id": 5,
      "situation": "A regional bank is struggling as many small businesses are unable to repay their loans after an economic downturn. What should the bank do?",
      "name": "Regional Bank Loan Defaults",
      "options": [
        { "choice": "Seek government intervention for financial relief.", "impact": 5 },
        { "choice": "Increase loan interest rates to cover losses.", "impact": -10 },
        { "choice": "Seize assets immediately to recover funds.", "impact": -5 },
        { "choice": "Restructure loans and offer extended repayment periods.", "impact": 10 }
      ]
    },
    {
      "id": 6,
      "situation": "A state government is pressuring banks to waive off farm loans to gain political mileage, but this will increase NPAs. What should the central bank (RBI) do?",
      "name": "Farm Loan Waiver Dilemma",
      "options": [
        { "choice": "Ignore the issue and let banks decide individually.", "impact": -5 },
        { "choice": "Oppose loan waivers and focus on long-term solutions like better credit assessment.", "impact": 10 },
        { "choice": "Agree to loan waivers but ask for government compensation.", "impact": 5 },
        { "choice": "Support loan waivers fully without conditions.", "impact": -10 },
      ]
    },
    {
      "id": 7,
      "situation": "Rajesh Malhotra, a businessman from Mumbai, frequently travels to Dubai for trade. Recently, authorities discovered that Rajesh had been moving large sums of money abroad through unofficial hawala channels instead of legal banking routes. When questioned, he claimed it was a 'faster and hassle-free way' to make payments without high banking fees or documentation. However, investigations revealed that some of this money was also linked to illegal activities, including tax evasion and smuggling. As an RBI official, what should be the most appropriate response to curb such hawala transactions?",
      "name": "Curbing Hawala Transactions",
      "options": [
        { "choice": "Deploy an AI-driven forensic monitoring system with real-time anomaly detection, cross-border auditing, and escalatory penalties, ensuring a risk-adaptive regulatory approach.", "impact": 10 },
        { "choice": "Strengthen KYC norms, increase random audits, and make high-value transactions subject to mandatory RBI approval.", "impact": 5 },
        { "choice": "Impose strict withdrawal and deposit limits, even if it disrupts legitimate trade.", "impact": -5 },
        { "choice": "Focus only on big hawala operators, accepting that some illegal cash flow is inevitable.", "impact": -10 }
      ]
    },
    {
      "id": 8,
      "situation": "India’s economy has entered a recession, with GDP contracting for two consecutive quarters. Unemployment is rising, consumer spending has fallen, and businesses are struggling due to weak demand. Inflation remains high at 6.8%, making basic goods expensive. The RBI and the government must decide how to revive economic growth while keeping inflation under control.",
      "name": "Economic Recession Response",
      "options": [
        { "choice": "Lower interest rates to encourage borrowing and investment.", "impact": 5 },
        { "choice": "Do nothing and let market forces recover naturally.", "impact": -5 },
        { "choice": "Increase government spending on infrastructure and job creation.", "impact": 10 },
        { "choice": "Increase taxes on luxury goods and high-income groups to fund welfare programs.", "impact": -10 }
      ]
    },
    {
      "id": 9,
      "situation": "The U.S. economy has entered a deep recession, with GDP shrinking for three consecutive quarters. Unemployment has risen to 8%, businesses are closing, and consumer spending has fallen sharply. At the same time, inflation remains high at 6.2%, making everyday goods expensive. The Federal Reserve and the U.S. government are under pressure to act, but any decision has risks. What should be the most effective policy response to revive the U.S. economy and control inflation?",
      "name": "Economic Recession Response",
      "options": [
        { "choice": "Raise taxes on global corporations and use the revenue for small business grants. ", "impact": -10 },
        { "choice": "Offer student loan forgiveness and rent relief instead of direct cash payments ", "impact": 5 },
        { "choice": "Launch a massive stimulus package, but with strict corporate accountability", "impact": 10 },
        { "choice": "Allow the recession to run its course and focus only on essential services ", "impact": -5 }
      ]
    },
    {
      "id": 10,  
      "situation": "Foreign Institutional Investors (FIIs) have pulled out $30B from Indian markets due to rising US interest rates, reducing forex reserves to $480B. The rupee has hit an all-time low, making imports expensive. Indian markets are volatile, and analysts warn of further capital flight. RBI needs to act quickly to restore investor confidence."  ,  
        "name": "Inflation and Economic Stability Decision",
        "options": [
          {"choice": "Do nothing and let market forces play out.","impact": -10 },
          {"choice": "Use reserves to buy rupees and support the currency. ","impact": 5 },
          {"choice": "Announce incentives for FIIs, like tax breaks on investments","impact": -5 },
          {"choice": "Hike interest rates to make Indian bonds attractive to FIIs. ","impact": 10 }
          
        ]
      },
  
      
      {
        "id": 11,
        "situation": "Global crude oil prices have surged to $120 per barrel, increasing India’s import bill. Forex reserves have fallen from $500B to $470B in just three months, and the rupee is weakening against the dollar. The government is concerned about a rising fiscal deficit, and businesses fear higher costs. The RBI must take action to prevent further depletion of reserves.",
        "name": "Inflation and Economic Stability Decision",
        "options": [
          {"choice": "Encourage rupee trade agreements with major oil suppliers.","impact": 10 },
          {"choice": "Allow rupee depreciation and let markets adjust naturally. ","impact":-10 },
          {"choice": "Intervene by selling dollars to control rupee depreciation","impact": 5 },
          {"choice": "Increase duties on luxury imports to conserve forex. ","impact": -5 }
          
        ] 
      },
  
  
  
  
      {
        "id": 12,
        "situation": "Imagine India is facing a tough economic situation. The rupee is falling in value against the US dollar, making imported goods like oil and electronics more expensive. This is causing inflation to rise, which means people are paying more for everyday items. At the same time, foreign investors are getting nervous about investing in India because of the unstable currency. What can the government do to control inflation and still attract foreign investment?",    
        "name": "Monetary Policy and Foreign Investment Strategies",
        "options": [
          {"choice": "Limit how much money people can borrow to reduce demand","impact": 5 },
          {"choice": "Increase interest rates to slow down spending and inflation. ","impact": 10 },
          {"choice": "Lower taxes on imported goods to reduce costs. ","impact": -5 },
          {"choice": "Increase government spending to boost economic growth. ","impact":-10 }
      ]
      },
  
  
  
      {
        "id": 13,
        "situation": "Suppose a large Indian textile company imports cotton from the US and exports clothing to Europe. Recently, the rupee has depreciated against both the dollar and the euro. This depreciation makes the company's exports more competitive in Europe, but it also increases the cost of importing cotton from the US. The company is considering strategies to manage these risks while maximizing its export benefits. What simple approach can the company use to protect itself from potential losses due to currency fluctuations?" ,   
        "name": "Hedging using Forward Contracts or Currency Futures",
        "options": [
          {"choice": "Increase export prices to offset higher import costs. ","impact": -5 },
          {"choice": "Diversify suppliers to reduce reliance on imports. ","impact":-10 },
          {"choice": "Fix the exchange rate for future transactions to avoid losses","impact": 10 },
          {"choice": "Reduce production to minimize import needs. ","impact": 5 }
      ]
      },
  
  
      {
        "id": 14,
        "situation": "The stock market has risen very quickly and unsustainably. Many people are buying stocks with borrowed money, and prices are much higher than they should be. Some investors are making money, but others are worried. The RBI is concerned about what might happen if the market crashes.",
        "name": "Stock Market Bubble",
        "options": [
          {"choice": "Make rules stricter for borrowing money to buy stocks and raise interest rates ","impact": 10 },
          {"choice": "Warn investors about the risks but don’t take immediate action ","impact": 5 },
          {"choice": "Encourage more investment by keeping interest rates low ","impact": -5 },
          {"choice": "Directly intervene in the market to keep prices high ","impact":-10 }
      ]
      },
  
  
  
      {
        "id": 15,
        "situation": "People are buying stocks based on speculation rather than their real value. Trading volumes are high, and investors are using a lot of debt. Some investors are starting to sell, and the RBI is thinking about how to prevent a big economic problem.",
        "name": "Stock Market Speculation",
        "options": [
          
          {"choice": "Make companies disclose more information to help investors decide ","impact": 5 },
          {"choice": "Lower interest rates to encourage more investment ","impact": -5 },
          {"choice": "Use central bank money to buy stocks directly ","impact":-10 },
          {"choice": "Increase taxes on stock profits and make lending rules stricter ","impact": 10 }
      ]
      },
  
  
  
  
      {
        "id": 16,
        "situation": "The real estate market is in trouble because too many buildings were constructed, and developers have a lot of debt. Property sales are down, and many developers are defaulting on loans. People are worried about their home values. The RBI is considering how to stabilize the sector.",
        "name": "Real Estate Crisis",
        "options": [
          {"choice": "Let the market fix itself without government help ","impact": -5 },
          {"choice": "Encourage banks to rework loans for homeowners and developers ","impact": 5 },
          {"choice": "Help developers who have projects that can still be completed ","impact": 10 },
          {"choice": "Try to artificially keep property prices high ","impact":-10 }
      ]
      },
  
  
  
      {
        "id": 17,
        "situation": "The housing market is in crisis because prices are too high, and mortgages are unaffordable. This has led to fewer sales and more foreclosures. There are many unsold homes, and people are spending less. The public is unhappy, and the RBI is thinking about changing monetary policies.",
        "name": "Housing Market Crisis",
        "options": [
          {"choice": "Increase the supply of affordable housing ","impact": 10 },
          {"choice": "Lower interest rates to make mortgages cheaper ","impact": 5 },
          {"choice": "Encourage banks to offer more risky mortgages ","impact": -5 },
          {"choice": "Use central bank money to buy mortgage-backed securities ","impact":-10 }
      ]
      },
  
  
  
      {
        "id": 18,
        "situation": "Arjun, an avid moviegoer from Delhi, used to watch films every weekend. In 2022, a ticket at his favorite multiplex cost ₹250, but by 2025, the price had surged to ₹450. Even popcorn and soft drinks, which once cost ₹300, now crossed ₹600. The rising costs weren't just affecting audiences—theater owners struggled with higher electricity bills, rent, and staff wages, while film producers faced rising production and marketing expenses due to cost-push inflation.Meanwhile, with the rise of OTT platforms, many viewers, including Arjun, started skipping theaters, further impacting the industry. The Reserve Bank of India (RBI) had been adjusting monetary policies to control inflation, but the entertainment sector still faced challenges. To help stabilize prices and encourage spending in the cinema industry, what should be the RBI's most effective economic policy decision?",
        "name": "Monetary Policy to Control Inflation",
        "options": [
          { "choice": "Increase taxes on entertainment and cinema halls, further driving up costs and discouraging moviegoers.","impact":-10 },
          { "choice": "Offer targeted subsidies to the entertainment industry, reducing production and operational costs to prevent further price hikes.","impact": 5 },
          { "choice": "Allow inflation to run unchecked, assuming consumer demand will automatically adjust to higher prices.","impact": -5 },
          { "choice": "Reduce interest rates, making loans cheaper for businesses like multiplexes and film studios, encouraging investment and affordability.","impact": 10 }
      ]
      }

  
  

]

export default situations
