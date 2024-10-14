import { AppProvider, LegacyCard, Tabs } from "@shopify/polaris";
import { useCallback, useState } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import Dashboard from "./Dashboard/Dashboard";
import Product from "./Products/Product";
import Setting from "./Setting/Setting";

const Main = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "dashboard",
      content: "Dashboard",
      panelID: "dashboard-content",
      contentComponent: <Dashboard />,
    },
    {
      id: "product",
      content: "Product",
      panelID: "product-content",
      contentComponent: <Product />,
    },
    {
      id: "setting",
      content: "Setting",
      panelID: "setting-content",
      contentComponent: <Setting />,
    },
  ];

  return (
    <AppProvider i18n={enTranslations}>
      <div className="m-5">
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <LegacyCard.Section title={tabs[selected].content}>
            <AppProvider
              i18n={{
                translations: {
                  "Polaris.DatePicker.previousMonth": "Tháng trước",
                  "Polaris.DatePicker.nextMonth": "Tháng sau",
                  "Polaris.DatePicker.showPreviousYear": "Hiện năm trước",
                  "Polaris.DatePicker.showNextYear": "Hiện năm sau",
                },
                language: "vi", // Hoặc ngôn ngữ mà bạn đang sử dụng
              }}
            >
              {tabs[selected].contentComponent}
            </AppProvider>
          </LegacyCard.Section>
        </Tabs>
      </div>
    </AppProvider>
  );
};

export default Main;
