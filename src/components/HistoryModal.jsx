import React, { Component } from "react";
import "../css/HistoryModal.css";
import Modal from "./Modal.jsx";
import { historyArr } from "../utils/tempValues";
import { isLeapYear } from "../utils/helperFunctions";

class HistoryModal extends Component {
  constructor(props) {
    super(props);

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    this.state = {
      showYearDropdown: false,
      showMonthDropdown: false,
      showDateDropdown: false,
      selectedYear: year,
      selectedMonth: month,
      selectedDate: day
    };
  }

  toggleYearDropdown = () => {
    this.setState(prevState => {
      return {
        showYearDropdown: !prevState.showYearDropdown,
        showMonthDropdown: false,
        showDateDropdown: false
      };
    });
  };

  selectYear = e => {
    if (!e.target.classList.contains("option-items")) {
      return;
    }
    this.setState({
      selectedYear: e.target.textContent,
      showYearDropdown: false
    });
  };

  toggleMonthDropdown = () => {
    this.setState(prevState => {
      return {
        showMonthDropdown: !prevState.showMonthDropdown,
        showYearDropdown: false,
        showDateDropdown: false
      };
    });
  };

  selectMonth = e => {
    if (!e.target.classList.contains("option-items")) {
      return;
    }
    this.setState({
      selectedMonth: e.target.textContent,
      showMonthDropdown: false
    });
  };

  toggleDateDropdown = () => {
    this.setState(prevState => {
      return {
        showDateDropdown: !prevState.showDateDropdown,
        showYearDropdown: false,
        showMonthDropdown: false
      };
    });
  };

  selectDate = e => {
    if (!e.target.classList.contains("option-items")) {
      return;
    }
    this.setState({
      selectedDate: e.target.textContent,
      showDateDropdown: false
    });
  };

  hideHistoryModalIfClickOnBg = e => {
    if (
      e.target.classList.contains("time-selection") ||
      e.target.classList.contains("down-arrow")
    ) {
      return;
    } else if (!e.target.classList.contains("modal")) {
      this.setState({
        showDateDropdown: false,
        showMonthDropdown: false,
        showYearDropdown: false
      });
    } else {
      this.props.hideHistoryModal();
    }
  };

  render() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();

    const yearArr = [year, year + 1, year + 2, year + 3, year + 4, year + 5];
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const daysInAMonth = isLeapYear(this.state.selectedYear)
      ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dayArr = [];
    for (let i = 1; i <= daysInAMonth[this.state.selectedMonth - 1]; i++) {
      dayArr.push(i);
    }

    return (
      <Modal>
        <div className="modal" onClick={this.hideHistoryModalIfClickOnBg}>
          <div className="history-modal-bg">
            <div
              className="history-modal-bg-x"
              onClick={this.props.hideHistoryModal}
            />
            <div className="time-bar">
              <div
                className="time-selection-year time-selection"
                onClick={this.toggleYearDropdown}
              >
                {this.state.selectedYear}
              </div>
              <div
                className="down-arrow-year down-arrow"
                onClick={this.toggleYearDropdown}
              />
              {this.state.showYearDropdown ? (
                <div
                  className="year-option-dropdown option-dropdown"
                  onClick={this.selectYear}
                >
                  {yearArr.map((year, idx) => {
                    return (
                      <div className="year-option option-items" key={idx}>
                        {year}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div
                className="time-selection-month time-selection"
                onClick={this.toggleMonthDropdown}
              >
                {this.state.selectedMonth}
              </div>
              <div
                className="down-arrow-month down-arrow"
                onClick={this.toggleMonthDropdown}
              />
              {this.state.showMonthDropdown ? (
                <div
                  className="month-option-dropdown option-dropdown"
                  onClick={this.selectMonth}
                >
                  {monthArr.map((month, idx) => {
                    return (
                      <div className="month-option option-items" key={idx}>
                        {month}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div
                className="time-selection-day time-selection"
                onClick={this.toggleDateDropdown}
              >
                {this.state.selectedDate}
              </div>
              <div
                className="down-arrow-day down-arrow"
                onClick={this.toggleDateDropdown}
              />
              {this.state.showDateDropdown ? (
                <div
                  className="date-option-dropdown option-dropdown"
                  onClick={this.selectDate}
                >
                  <div className="date-option-dropdown-child">
                    {dayArr.map((day, idx) => {
                      return (
                        <div className="date-option option-items" key={idx}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="history-modal-confirm-btn" />
            </div>

            <div className="info-header-row">
              <div className="game-no" />
              <div className="bet-time" />
              <div className="bet-item" />
              <div className="bet-amount" />
              <div className="bet-result" />
              <div className="bet-winning" />
            </div>
            <div className="history-modal-scrollable-body-container">
              <div className="history-modal-scrollable-body">
                {historyArr.map((obj, idx) => {
                  let divObj = (
                    <div className="history-body-row" key={idx}>
                      <div className="game-no-item cell-item ">
                        {obj.roomId}
                      </div>
                      <div className="bet-time-item cell-item ">{obj.time}</div>
                      <div className="bet-item-item cell-item ">
                        {obj.betItem}
                      </div>
                      <div className="bet-amount-item cell-item ">
                        {obj.betAmount}
                      </div>
                      <div className="bet-result-item cell-item ">
                        {obj.result}
                      </div>
                      <div className="bet-winning-item cell-item ">
                        {obj.award}
                      </div>
                    </div>
                  );

                  return divObj;
                })}
              </div>
            </div>
            <div className="history-modal-bottom-bar">
              <div className="history-modal-bottom-bar-bet-amount" />
              <div className="history-modal-bottom-bar-bet-amount-display">
                100000
              </div>
              <div className="history-modal-bottom-bar-total-winning" />
              <div className="history-modal-bottom-bar-total-winning-display">
                100000
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default HistoryModal;
