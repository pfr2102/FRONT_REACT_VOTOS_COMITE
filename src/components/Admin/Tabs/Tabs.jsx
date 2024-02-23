import { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Tabs.scss";
import { CustomCardComponent } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";
import { useStage } from "../../../hooks/useStage";
import { SearchBar } from "../SearchBar/SearchBar";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  const { users, loading, getUsers, auth } = useUser();
  const { stages, loadingStage, getStage } = useStage();

  useEffect(() => {
    getUsers();
    getStage();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const filteredUsers = users ? users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const dateValidator = (stage) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = parseDateString(stage.fecha_inicio);
    const endDate = parseDateString(stage.fecha_fin);

    return today >= startDate && today <= endDate;
  };

  const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <>
      <Nav tabs>
        <NavItem
          className={activeTab === "1" ? "activeTab tabBase" : "tabBase"}
          onClick={() => toggle("1")}
        >
          Etapa 1
        </NavItem>
        <NavItem
          className={activeTab === "2" ? "activeTab tabBase" : "tabBase"}
          onClick={() => toggle("2")}
        >
          Etapa 2
        </NavItem>
      </Nav>
      <SearchBar setSearch={setSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="tabContentContainer">
              {stages && dateValidator(stages[0]) ? (
                filteredUsers.filter(user => user.id_rank_fk === auth.me.id_rank_fk).map((user) => (
                  <div className="custom-card-wrapper" key={user.id}>
                    <div className="custom-card-inner">
                      <CustomCardComponent user={user} action={"Nominar"} />
                    </div>
                  </div>
                ))
              ) : (
                <h1>No hay candidatos disponibles</h1>
              )}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="tabContentContainer">
              {stages && dateValidator(stages[1]) ? (
                filteredUsers.filter(user => user.id_rank_fk === auth.me.id_rank_fk) .map((user) => (
                  <div className="custom-card-wrapper" key={user.id}>
                    <div className="custom-card-inner">
                      <CustomCardComponent user={user} action={"Votar"} />
                    </div>
                  </div>
                ))
              ) : (
                <h1>No hay candidatos disponibles</h1>
              )}
            </div>
          </TabPane>
        </TabContent>
      )}
    </>
  );
};
