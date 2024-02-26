import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Tabs.scss";
import { CustomCardComponent } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";
import { useVotes } from "../../../hooks/useVotes";
import { useStage } from "../../../hooks/useStage";
import { SearchBar } from "../SearchBar/SearchBar";
import { ModalBasic } from "../../common/ModalBasic/ModalBasic";
import { AddVoteForm } from "../AddVoteForm/AddVoteForm";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  const { users, loading, getUsers, auth } = useUser();
  const { votes, loadingVotes, getTopVots, getVotes, userVoted } = useVotes();
  const { stages, loadingStage, getStage } = useStage();
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getUsers();
    getStage();
    renderCandidates();
  }, []);

  useEffect(() => {
    if (stages) {
      renderCandidates();
    }
  }, [activeTab]);

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const dateValidator = (stage) => {
    if(stages){
      if (stage === 1) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = parseDateString(stages[0].fecha_inicio);
        const endDate = parseDateString(stages[0].fecha_fin);
  
        const validate = today >= startDate && today <= endDate;

        return validate;
      } else if (stage === 2) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = parseDateString(stages[1].fecha_inicio);
        const endDate = parseDateString(stages[1].fecha_fin);
  
        const validate = today >= startDate && today <= endDate;

        return validate;
      }
    }
  };

  const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const renderCandidates = async () => {
    const year = new Date().getFullYear().toString();
    const etapa = activeTab === "1" ? 1 : 2;
    const result = await userVoted(etapa, year);
    setHasVoted(result);
    dateValidator(etapa);
  };

  const electionCards = (selectedUser) => {
    if (auth.me.id_rank_fk === 3 && selectedCards.length >= 3) {
      setShowModal(true);
    } else if (auth.me.id_rank_fk !== 3 && selectedCards.length >= 2) {
      setShowModal(true);
    } else {
      setSelectedCards([...selectedCards, selectedUser]);
    }
  };

  const removeCard = (userId) => {
    const updatedCards = selectedCards.filter((card) => card.id !== userId);
    setSelectedCards(updatedCards);
    setShowModal(false);
  };

  const filteredUsersWithoutSelectedCards = filteredUsers.filter((user) => {
    return !selectedCards.some((card) => card.id === user.id);
  });

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
      {loading ? (
        <p>Cargando a los candidatos...</p>
      ) : (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <SearchBar setSearch={setSearch} />
            {hasVoted ? (
              <p>Ya has votado en esta etapa.</p>
            ) : dateValidator(parseInt(activeTab)) ? (
              <div className="tabContentContainer">
                {filteredUsersWithoutSelectedCards
                  .filter((user) => user.id_rank_fk === auth.me.id_rank_fk)
                  .map((user) => (
                    <div className="custom-card-wrapper" key={user.id}>
                      <div className="custom-card-inner">
                        <CustomCardComponent
                          user={user}
                          action={"Nominar"}
                          electionCards={electionCards}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Estás fuera de la fecha de votaciones.</p>
            )}
          </TabPane>

          <TabPane tabId="2">
            <SearchBar setSearch={setSearch} />
            {hasVoted ? (
              <p>Ya has votado en esta etapa.</p>
            ) : (
              <div className="tabContentContainer">
                {filteredUsersWithoutSelectedCards
                  .filter((user) => user.id_rank_fk === auth.me.id_rank_fk)
                  .map((user) => (
                    <div className="custom-card-wrapper" key={user.id}>
                      <div className="custom-card-inner">
                        <CustomCardComponent
                          user={user}
                          action={"Nominar"}
                          electionCards={electionCards}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabPane>
        </TabContent>
      )}
      <ModalBasic
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Realiza tu votación para la etapa ${
          activeTab === "1" ? "1" : "2"
        }`}
        size={"lg"}
      >
        <AddVoteForm
          users={selectedCards}
          onDelete={removeCard}
          action={"Eliminar voto"}
          stage={activeTab === "1" ? 1 : 2}
          onClose={() => setShowModal(false)}
        />
      </ModalBasic>
    </>
  );
};
