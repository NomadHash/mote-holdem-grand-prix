import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStop, FaRedo, FaUsers, FaTrophy, FaClock, FaTrash, FaEdit, FaBars, FaTimes, FaChevronUp, FaChevronDown, FaExpand, FaCompress, FaTable } from 'react-icons/fa';
import './App.css';
import { FaTableList, FaUser } from 'react-icons/fa6';

const AppContainer = styled.div`
  min-height: 100vh;
  // background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  background: linear-gradient(135deg, #000000 0%, #691616 100%);
  padding: 20px;
  font-family: 'Arial', sans-serif;
  display: flex;
`;

const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.img`
  height: 160px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BottomLogo = styled.img`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  height: 16px;
  width: auto;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  z-index: 1000;
  filter: brightness(0) invert(1);
  
  &:hover {
    opacity: 1;
  }
`;

const PokerTable = styled.div`
  position: relative;
  width: 360px;
  height: 200px;
  background: #222222;
  border: 4px solid #5c5c5c;
  border-radius: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  margin: 60px auto 32px auto;
`;

const CommunityCards = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const CardSlot = styled.div`
  width: 30px;
  height: 40px;

  background: #222222;
  border: 2px solid #4a7c4a;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const PlayerPosition = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${props => props.eliminated ? '#723130' : '#2b2c2e'};
  border: 3px solid ${props => props.eliminated ? '#d64a48' : '#825797'};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }
`;

const PositionName = styled.div`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 2px;
`;

const TablePlayerName = styled.div`
  font-size: 12px;
  text-align: center;
  line-height: 1;
  max-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BlindDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color || '#fff'};
  z-index: 1;
`;

const BlindLabel = styled.div`
  position: absolute;
  font-size: 10px;
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
`;

const DealerButton = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 10px;
  font-weight: bold;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
`;

const MainContent = styled.div`
  position:relative;
  padding-top: 56px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: ${props => props.leftSidebarOpen ? '540px' : '0'};
  margin-right: ${props => props.sidebarOpen ? '320px' : '0'};
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 20px;
  right: 0;
  width: 300px;
  background:#0e0e0ecf;
  border-radius: 15px 0 0 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-right: none;
  height: calc(100vh - 40px);
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  z-index: 99999;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2b2c2e;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #df605e;
    border-radius: 4px;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const LeftSidebar = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  width: 520px;
  background: #ffffff0f;
  border-radius: 0 15px 15px 0;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-left: none;
  height: calc(100vh - 40px);
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  z-index: 999;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2b2c2e;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #df605e;
    border-radius: 4px;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const SidebarToggle = styled.button`
  position: fixed;
  top: 20px;
  right: ${props => props.isOpen ? '320px' : '20px'};
  background: #00000047;
  color: white;
  border: none;
  outline: none;
  border-radius: 50%;
  
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: #33333369;
    border-color: #33333369;
    transform: scale(1.1);
  }
`;

const LeftSidebarToggle = styled.button`
  position: fixed;
  top: 20px;
  left: ${props => props.isOpen ? '540px' : '20px'};
  background: #000000;
  color: white;
  border: 2px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: #333333;
    border-color: #333333;
    transform: scale(1.1);
  }
`;

const BottomSidebar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #0c0c0ce8;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
  border-top: none;
  height: 80%;
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: translateY(${props => props.isOpen ? '0' : '100%'});
  z-index: 9999;
  padding: 32px 32px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2b2c2e;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #df605e;
    border-radius: 4px;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const BottomSidebarToggle = styled.button`
  position: fixed;
  bottom: ${props => props.isOpen ? '82%' : '20px'};
  right: 0px;
  transform: translateX(-50%);
  background: #00000047;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  outline: none;
  
  &:hover {
    background: #33333369;
    border-color: #33333369;
  }
`;

const RankingTable = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const RankingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #2b2c2e;
`;

const RankingTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RankingRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px 80px;
  gap: 15px;
  padding: 12px 15px;
  background: ${props => props.rank <= 3 ? '#2b2c2e' : '#1a1a1a'};
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid ${props => {
    if (props.rank === 1) return '#ffd700';
    if (props.rank === 2) return '#c0c0c0';
    if (props.rank === 3) return '#cd7f32';
    return '#df605e';
  }};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const RankCell = styled.div`
  font-weight: bold;
  color: ${props => {
    if (props.rank === 1) return '#ffd700';
    if (props.rank === 2) return '#c0c0c0';
    if (props.rank === 3) return '#cd7f32';
    return '#ffffff';
  }};
  font-size: 1.2rem;
`;

const PlayerCell = styled.div`
  color: white;
  font-weight: bold;
`;

const PointsCell = styled.div`
  color:rgb(255, 255, 255);
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
`;





const TimerSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const TimerDisplay = styled.div`
  font-size: 25rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 30px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  letter-spacing: 4px;
  line-height: 1;
`;

const LevelDisplay = styled.div`
position: relative;
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const LevelControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: absolute;
  top: 4px;
  right: 120px;
`;

const LevelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0 0 0;
  flex-wrap: wrap;
  position:absolute;
  bottom:80px;
  left:0;
  right:0;
  margin:0 auto;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const StartButton = styled(Button)`
  background: #00000000;
  color: white;
  // border: 2px solid #df605e;
  border: 2px solid #5878b1;
  
  &:hover {
    background: #5878b1;
    border-color: #5878b1;
    svg{
      color: #450f0f !important;
    }
  }
`;

const PauseButton = styled(Button)`
  background: #00000000;
  color: #000000;
  border: 2px solid #5878b1;
  
  &:hover {
    background: #5878b1;
    svg{
      color: #450f0f !important;
    }
  }
`;

const StopButton = styled(Button)`
  background: #00000000;
  color: white;
  border: 2px solid #ffffff;
  
  &:hover {
    background: #ffffff;
    border-color: #ffffff;
    svg{
      color: #450f0f !important;
    }
  }
`;

const ResetButton = styled(Button)`
  background: #00000000;
  color: #000000;
  border: 2px solid #df605e;
  svg{
  color: #df605e;
  }
  &:hover {
    background: #df605e;
    border-color: #df605e;
    svg{
      color: #450f0f !important;
    }
  }
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const SettingCard = styled.div`
  background: #00000000;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #df605e;
`;

const SettingTitle = styled.h3`
  margin: 0 0 10px 0;
  color:rgb(255, 255, 255);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 8px;
  background-color: #2b2c2e;
  color: #bbbbbb;

`;

const Label = styled.label`
  display: block;
  margin-bottom: 3px;
  font-weight: bold;
  color:rgb(255, 255, 255);
  font-size: 0.85rem;
`;

const PlayersSection = styled.div`
  margin-top: 20px;
`;

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const PlayerCard = styled.div`
  background: ${props => props.eliminated ? '#723130' : '#2b2c2e'};
  border: 2px solid ${props => props.eliminated ? '#d64a48' : '#2b2c2e'};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const PlayerCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PlayerCardActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  transition: all 0.2s ease;
  
 
`;

const DeleteButton = styled(ActionButton)`
  color: #dc3545;

`;

const EditButton = styled(ActionButton)`
  color: #007bff;
`;

const PlayerName = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: ${props => props.eliminated ? '#ffffff' : '#ffffff'};
`;

const PlayerChips = styled.div`
  font-size: 0.9rem;
  color: ${props => props.eliminated ? '#8b8b8b' : '#ffffff'};
  font-weight: bold;
`;

const AddPlayerButton = styled(Button)`
  background: linear-gradient(88deg, #6e0909 0%, #2c50af 100%);
  color: white;
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 0.9rem;
`;

const GameEndButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #df605e;
  color: white;
  border: 2px solid #df605e;
  margin-top: 15px;
  padding: 10px 10px;
  font-size: 0.8rem;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddTournamentButton = styled.button`
  background: linear-gradient(88deg, #6e0909 0%, #2c50af 100%);
  color: white;
  border:none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  

`;

const TableModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const TableModalContent = styled.div`
  background: linear-gradient(135deg, #000000 0%, #691616 100%);
  border-radius: 20px;
  padding: 40px;
  max-width: 90vw;
  max-height: 90vh;
  width: 1200px;
  height: 870px;
  position: relative;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.8)'};
  transition: transform 0.3s ease;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const TableModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
`;

const ModalPokerTable = styled.div`
  position: relative;
  width: 800px;
  height: 400px;
  background: #222222;
  border: 6px solid #5c5c5c;
  border-radius: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
  margin: 0 auto 40px auto;
`;

const ModalPlayerPosition = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: ${props => props.eliminated ? '#723130' : '#2b2c2e'};
  border: 4px solid ${props => props.eliminated ? '#d64a48' : '#825797'};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  }
`;

const ModalPositionName = styled.div`
  font-size: 20px;
  color: #ccc;
  margin-bottom: 6px;
`;

const ModalTablePlayerName = styled.div`
  font-size: 18px;
  text-align: center;
  line-height: 1;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ModalDealerButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: white;
  border: 3px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 14px;
  font-weight: bold;
  z-index: 10;
`;

const ModalBlindDot = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.color || '#fff'};
  z-index: 1;
`;

const ModalBlindLabel = styled.div`
  position: absolute;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
`;

const TableExpandButton = styled.button`
  background: linear-gradient(88deg, #6e0909 0%, #2c50af 100%);
  color: white;
  outline: none;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px auto;
  width: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const ModalTimer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  min-width: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const ModalTimerDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 5px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 2px;
  line-height: 1;
`;

const ModalLevelDisplay = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
  margin: 0;
  font-weight: bold;
`;

const ModalControlButtons = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 100;
`;

const ModalControlButton = styled.button`
  padding: 8px 12px;
  border: 2px solid;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 40px;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const ModalStartButton = styled(ModalControlButton)`
  background: #00000000;
  color: #5878b1;
  border-color: #5878b1;
  
  &:hover {
    background: #5878b1;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ModalPauseButton = styled(ModalControlButton)`
  background: #00000000;
  color: #5878b1;
  border-color: #5878b1;
  
  &:hover {
    background: #5878b1;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ModalStopButton = styled(ModalControlButton)`
  background: #00000000;
  color: white;
  border-color: #ffffff;
  
  &:hover {
    background: #ffffff;
    color: #000000;
  }
`;

const ModalResetButton = styled(ModalControlButton)`
  background: #00000000;
  color: #df605e;
  border-color: #df605e;
  
  &:hover {
    background: #df605e;
    color: white;
  }
`;

const ModalLevelControls = styled.div`
  position: absolute;
  bottom: 32px;
  right: 260px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 100;
`;

const ModalLevelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [blindLevels, setBlindLevels] = useState([
    { level: 1, smallBlind: 50, bigBlind: 100, duration: 600 },
    { level: 2, smallBlind: 100, bigBlind: 200, duration: 600 },
    { level: 3, smallBlind: 150, bigBlind: 300, duration: 600 },
    { level: 4, smallBlind: 200, bigBlind: 400, duration: 600 },
    { level: 5, smallBlind: 300, bigBlind: 600, duration: 600 },
    { level: 6, smallBlind: 400, bigBlind: 800, duration: 600 },
    { level: 7, smallBlind: 500, bigBlind: 1000, duration: 600 },
    { level: 8, smallBlind: 600, bigBlind: 1200, duration: 600 },
    { level: 9, smallBlind: 800, bigBlind: 1600, duration: 600 },
    { level: 10, smallBlind: 1000, bigBlind: 2000, duration: 600 },
  ]);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [startingChips, setStartingChips] = useState(10000);
  const [levelDuration, setLevelDuration] = useState(600);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [bottomSidebarOpen, setBottomSidebarOpen] = useState(false);
  const [positionOffset, setPositionOffset] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tournamentResults, setTournamentResults] = useState(() => {
    // 로컬스토리지에서 데이터 불러오기
    const saved = localStorage.getItem('tournamentResults');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTournament, setNewTournament] = useState({
    winner: '',
    points: 1000
  });

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            // 레벨 업
            if (currentLevel < blindLevels.length) {
              setCurrentLevel(currentLevel + 1);
              return blindLevels[currentLevel].duration;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentLevel, blindLevels]);

  // tournamentResults가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('tournamentResults', JSON.stringify(tournamentResults));
  }, [tournamentResults]);

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(blindLevels[currentLevel - 1].duration);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setCurrentLevel(1);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(blindLevels[currentLevel - 1].duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: players.length + 1,
        name: newPlayerName,
        chips: startingChips,
        eliminated: false
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const eliminatePlayer = (playerId) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, eliminated: !player.eliminated }
        : player
    ));
  };

  const updatePlayerChips = (playerId, newChips) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, chips: Math.max(0, newChips) }
        : player
    ));
  };

  const deletePlayer = (playerId) => {
    setPlayers(players.filter(player => player.id !== playerId));
  };

  const updatePlayerName = (playerId, newName) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, name: newName }
        : player
    ));
  };

  const increaseLevel = () => {
    if (currentLevel < blindLevels.length) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(blindLevels[currentLevel].duration);
    }
  };

  const decreaseLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
      setTimeLeft(blindLevels[currentLevel - 2].duration);
    }
  };

  const rotatePositions = () => {
    const activePlayers = players.filter(p => !p.eliminated);
    if (activePlayers.length > 1) {
      setPositionOffset((prevOffset) => (prevOffset + 1) % activePlayers.length);
    }
  };

  const addTournamentResult = () => {
    if (newTournament.winner.trim()) {
      const existingPlayer = tournamentResults.find(p => p.playerName === newTournament.winner);
      
      let nextId;
      if (tournamentResults.length === 0) {
        nextId = 1;
      } else {
        const maxId = Math.max(...tournamentResults.map(p => p.id));
        nextId = maxId + 1;
      }

      if (existingPlayer) {
        // 기존 플레이어의 포인트 업데이트
        setTournamentResults(prev => prev.map(p => 
          p.playerName === newTournament.winner 
            ? { ...p, points: p.points + newTournament.points }
            : p
        ).sort((a, b) => b.points - a.points)); // 업데이트 후 정렬
      } else {
        // 새로운 플레이어 추가
        const newPlayer = {
          id: nextId,
          playerName: newTournament.winner,
          points: newTournament.points
        };
        setTournamentResults(prev => [...prev, newPlayer].sort((a, b) => b.points - a.points)); // 추가 후 정렬
      }
      
      // 입력 필드 초기화
      setNewTournament({
        winner: '',
        points: 1000
      });
    }
  };

  const deleteTournamentPlayer = (playerId) => {
    if (window.confirm('정말로 이 플레이어를 삭제하시겠습니까?')) {
      setTournamentResults(prev => prev.filter(p => p.id !== playerId).sort((a, b) => b.points - a.points));
    }
  };

  const updateTournamentPlayerName = (playerId, newName) => {
    if (newName && newName.trim()) {
      setTournamentResults(prev => prev.map(p => 
        p.id === playerId 
          ? { ...p, playerName: newName.trim() }
          : p
      ).sort((a, b) => b.points - a.points));
    }
  };

  const updateTournamentPlayerPoints = (playerId, newPoints) => {
    if (newPoints >= 0) {
      setTournamentResults(prev => prev.map(p => 
        p.id === playerId 
          ? { ...p, points: newPoints }
          : p
      ).sort((a, b) => b.points - a.points));
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };


  const getSortedRankings = () => {
    return [...tournamentResults].sort((a, b) => b.points - a.points);
  };

  const clearAllData = () => {
    if (window.confirm('정말로 모든 랭킹 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setTournamentResults([]);
      localStorage.removeItem('tournamentResults');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tournamentResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tournament-rankings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            setTournamentResults(data.sort((a, b) => b.points - a.points));
            alert('데이터를 성공적으로 가져왔습니다!');
          } else {
            alert('올바른 데이터 형식이 아닙니다.');
          }
        } catch (error) {
          alert('파일을 읽는 중 오류가 발생했습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 전체화면 진입
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // 전체화면 종료
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // 전체화면 상태 변경 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 스페이스바 키보드 이벤트 리스너
  useEffect(() => {
    const handleKeyPress = (event) => {
      // 스페이스바가 눌렸고, 입력 필드에 포커스가 없을 때만 실행
      if (event.code === 'Space' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault(); // 스크롤 방지
        const activePlayers = players.filter(p => !p.eliminated);
        if (activePlayers.length > 1) {
          rotatePositions();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [players]);

  const currentBlinds = blindLevels[currentLevel - 1];

  const getPositions = (playerCount) => {
    if (playerCount === 2) {
      return ['BB', 'SB(BTN)'];
    } else if (playerCount === 3) {
      return ['BB', 'BTN', 'SB'];
    } else if (playerCount === 4) {
      return ['BB', 'CO', 'BTN', 'SB'];
    } else if (playerCount === 5) {
      return ['BB', 'UTG', 'CO', 'BTN', 'SB'];
    } else {
      return ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
    }
  };

  const getDealerIndex = (playerCount) => {
    if (playerCount === 2) {
      return 1; // SB(BTN)
    } else if (playerCount === 3) {
      return 1; // BTN
    } else if (playerCount === 4) {
      return 2; // BTN
    } else if (playerCount === 5) {
      return 3; // BTN
    } else {
      return 3; // BTN (6인 이상)
    }
  };
  
  const renderPokerTable = () => {
    const activePlayers = players.filter(p => !p.eliminated);
    const positions = getPositions(activePlayers.length);
    const tableWidth = 360; // PokerTable width
    const tableHeight = 200; // PokerTable height
    const playerPositionDiameter = 60; // PlayerPosition width/height
    const playerPositionRadius = playerPositionDiameter / 2;
    const dealerButtonDiameter = 20; // DealerButton width/height
    const dealerButtonRadius = dealerButtonDiameter / 2;
    
    // 테이블의 중심 좌표
    const centerX = tableWidth / 2;
    const centerY = tableHeight / 2;
  
    // 테이블 테두리의 장반경 (x축)과 단반경 (y축)
    const ellipseRadiusX = tableWidth / 2 - 4; // 테이블 border 두께 4px 고려
    const ellipseRadiusY = tableHeight / 2 - 4; // 테이블 border 두께 4px 고려
  
    // 딜러 버튼과 플레이어 포지션 사이의 간격
    const dealerButtonOffset = 5; // 딜러 버튼이 플레이어 포지션 테두리에서 얼마나 떨어질지 조정

    // 블라인드 점과 레이블이 플레이어 포지션 안쪽으로 얼마나 떨어질지
    const blindOffset = 42; 

    return (
      <>
      <PokerTable>
        {activePlayers.map((player, index) => {
          const totalPlayers = activePlayers.length;
          const adjustedIndex = (index - positionOffset + totalPlayers) % totalPlayers;
          const angleRad = ((index * (360 / totalPlayers)) - 90) * (Math.PI / 180); // 물리적 위치는 원래 index 사용
          
          const px = centerX + ellipseRadiusX * Math.cos(angleRad);
          const py = centerY + ellipseRadiusY * Math.sin(angleRad);
          
          const currentPositionName = positions[adjustedIndex]; // 포지션 텍스트만 조정된 index 사용

          return (
            <PlayerPosition
              key={player.id}
              eliminated={player.eliminated}
              style={{
                left: px - playerPositionRadius,
                top: py - playerPositionRadius,
              }}
              onClick={() => eliminatePlayer(player.id)}
            >
              <PositionName>{currentPositionName}</PositionName>
              <TablePlayerName>{player.name}</TablePlayerName>
            </PlayerPosition>
          );
        })}
        
        {activePlayers.length > 0 && (
          () => {
            const dealerIndex = getDealerIndex(activePlayers.length);
            const totalPlayers = activePlayers.length;
            const adjustedDealerIndex = (dealerIndex + positionOffset) % totalPlayers;
            const dealerAngleRad = ((adjustedDealerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

            const dealerPx = centerX + ellipseRadiusX * Math.cos(dealerAngleRad);
            const dealerPy = centerY + ellipseRadiusY * Math.sin(dealerAngleRad);

            const dealerBtnOffsetX = (playerPositionRadius + dealerButtonRadius + dealerButtonOffset) * Math.cos(dealerAngleRad);
            const dealerBtnOffsetY = (playerPositionRadius + dealerButtonRadius + dealerButtonOffset) * Math.sin(dealerAngleRad);

            return (
              <DealerButton
                style={{
                  left: dealerPx + dealerBtnOffsetX - dealerButtonRadius,
                  top: dealerPy + dealerBtnOffsetY - dealerButtonRadius,
                }}
              >
                D
              </DealerButton>
            );
          }
        )()}

        {/* 블라인드 점과 레이블 표시 */}
        {activePlayers.length > 0 && (
          <>
            {/* SB 위치 */}
                         {(() => {
               const totalPlayers = activePlayers.length;
               const sbIndexInPositions = positions.indexOf('SB') !== -1 ? positions.indexOf('SB') : positions.indexOf('SB(BTN)');
               if (sbIndexInPositions === -1) return null;

               const sbPlayerIndex = (sbIndexInPositions + positionOffset) % totalPlayers;
               const sbAngleRad = ((sbPlayerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

              const sbDotX = centerX + (ellipseRadiusX - blindOffset) * Math.cos(sbAngleRad);
              const sbDotY = centerY + (ellipseRadiusY - blindOffset) * Math.sin(sbAngleRad);

              return (
                <>
                  <BlindDot 
                    color="#4aa4e6" 
                    style={{ 
                      left: sbDotX - 4, 
                      top: sbDotY - 4 
                    }} 
                  />
                  <BlindLabel 
                    style={{ 
                      left: sbDotX + 8,
                      top: sbDotY - 8 
                    }}
                  >
                    0.5
                  </BlindLabel>
                </>
              );
            })()}

            {/* BB 위치 */}
                         {(() => {
               const totalPlayers = activePlayers.length;
               const bbIndexInPositions = positions.indexOf('BB');
               if (bbIndexInPositions === -1) return null;

               const bbPlayerIndex = (bbIndexInPositions + positionOffset) % totalPlayers;
               const bbAngleRad = ((bbPlayerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

              const bbDotX = centerX + (ellipseRadiusX - blindOffset) * Math.cos(bbAngleRad);
              const bbDotY = centerY + (ellipseRadiusY - blindOffset) * Math.sin(bbAngleRad);

              return (
                <>
                  <BlindDot 
                    color="#1a73e8" 
                    style={{ 
                      left: bbDotX - 4, 
                      top: bbDotY - 4 
                    }} 
                  />
                  <BlindLabel 
                    style={{ 
                      left: bbDotX + 8,
                      top: bbDotY - 8 
                    }}
                  >
                    1
                  </BlindLabel>
                </>
              );
            })()}
          </>
        )}

        <div>
         
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<Logo src="/logo_.png" alt="MGP Logo" style={{ height: '40px'}}/>
</div>
        {players.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#8b8b8b',
            fontSize: '0.9rem',
            marginTop: '12px'
          }}>
            플레이어를 추가하면<br/>테이블에 표시됩니다
          </div>
        )}
        </div>
      </PokerTable>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2px', gap: '8px' }}>
      {activePlayers.length > 1 && (
          <>
            <GameEndButton onClick={rotatePositions}>
            <FaRedo size={12}/>
              <div style={{ fontSize: '0.8rem' }}>포지션 회전</div>
            </GameEndButton>
            <div style={{
              color: '#cccccc',
              fontSize: '0.7rem',
              textAlign: 'center',
              opacity: 0.7
            }}>
              💡 스페이스바로 포지션 회전
            </div>
          </>
        )}
        <TableExpandButton onClick={() => setIsTableModalOpen(true)}>
            <FaExpand /> 테이블 확대 하기
          </TableExpandButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start',height: '73%' }}>
      <img src="/hand_ranking.webp" alt="MGP Logo" style={{ height: '100%'}}/>
      </div>
      </>
      
    );
  };

  const renderModalPokerTable = () => {
    const activePlayers = players.filter(p => !p.eliminated);
    const positions = getPositions(activePlayers.length);
    const tableWidth = 800; // ModalPokerTable width
    const tableHeight = 400; // ModalPokerTable height
    const playerPositionDiameter = 100; // ModalPlayerPosition width/height
    const playerPositionRadius = playerPositionDiameter / 2;
    const dealerButtonDiameter = 30; // ModalDealerButton width/height
    const dealerButtonRadius = dealerButtonDiameter / 2;
    
    // 테이블의 중심 좌표
    const centerX = tableWidth / 2;
    const centerY = tableHeight / 2;
  
    // 테이블 테두리의 장반경 (x축)과 단반경 (y축)
    const ellipseRadiusX = tableWidth / 2 - 6; // 테이블 border 두께 6px 고려
    const ellipseRadiusY = tableHeight / 2 - 6; // 테이블 border 두께 6px 고려
  
    // 딜러 버튼과 플레이어 포지션 사이의 간격
    const dealerButtonOffset = 8; // 딜러 버튼이 플레이어 포지션 테두리에서 얼마나 떨어질지 조정

    // 블라인드 점과 레이블이 플레이어 포지션 안쪽으로 얼마나 떨어질지
    const blindOffset = 70; 

    return (
      <ModalPokerTable>
        {activePlayers.map((player, index) => {
          const totalPlayers = activePlayers.length;
          const adjustedIndex = (index - positionOffset + totalPlayers) % totalPlayers;
          const angleRad = ((index * (360 / totalPlayers)) - 90) * (Math.PI / 180); // 물리적 위치는 원래 index 사용
          
          const px = centerX + ellipseRadiusX * Math.cos(angleRad);
          const py = centerY + ellipseRadiusY * Math.sin(angleRad);
          
          const currentPositionName = positions[adjustedIndex]; // 포지션 텍스트만 조정된 index 사용

          return (
            <ModalPlayerPosition
              key={player.id}
              eliminated={player.eliminated}
              style={{
                left: px - playerPositionRadius,
                top: py - playerPositionRadius,
              }}
              onClick={() => eliminatePlayer(player.id)}
            >
              <ModalPositionName>{currentPositionName}</ModalPositionName>
              <ModalTablePlayerName>{player.name}</ModalTablePlayerName>
            </ModalPlayerPosition>
          );
        })}
        
        {activePlayers.length > 0 && (
          () => {
            const dealerIndex = getDealerIndex(activePlayers.length);
            const totalPlayers = activePlayers.length;
            const adjustedDealerIndex = (dealerIndex + positionOffset) % totalPlayers;
            const dealerAngleRad = ((adjustedDealerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

            const dealerPx = centerX + ellipseRadiusX * Math.cos(dealerAngleRad);
            const dealerPy = centerY + ellipseRadiusY * Math.sin(dealerAngleRad);

            const dealerBtnOffsetX = (playerPositionRadius + dealerButtonRadius + dealerButtonOffset) * Math.cos(dealerAngleRad);
            const dealerBtnOffsetY = (playerPositionRadius + dealerButtonRadius + dealerButtonOffset) * Math.sin(dealerAngleRad);

            return (
              <ModalDealerButton
                style={{
                  left: dealerPx + dealerBtnOffsetX - dealerButtonRadius,
                  top: dealerPy + dealerBtnOffsetY - dealerButtonRadius,
                }}
              >
                D
              </ModalDealerButton>
            );
          }
        )()}

        {/* 블라인드 점과 레이블 표시 */}
        {activePlayers.length > 0 && (
          <>
            {/* SB 위치 */}
            {(() => {
               const totalPlayers = activePlayers.length;
               const sbIndexInPositions = positions.indexOf('SB') !== -1 ? positions.indexOf('SB') : positions.indexOf('SB(BTN)');
               if (sbIndexInPositions === -1) return null;

               const sbPlayerIndex = (sbIndexInPositions + positionOffset) % totalPlayers;
               const sbAngleRad = ((sbPlayerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

              const sbDotX = centerX + (ellipseRadiusX - blindOffset) * Math.cos(sbAngleRad);
              const sbDotY = centerY + (ellipseRadiusY - blindOffset) * Math.sin(sbAngleRad);

              return (
                <>
                  <ModalBlindDot 
                    color="#4aa4e6" 
                    style={{ 
                      left: sbDotX - 6, 
                      top: sbDotY - 6 
                    }} 
                  />
                  <ModalBlindLabel 
                    style={{ 
                      left: sbDotX + 18,
                      top: sbDotY - 18 
                    }}
                  >
                    0.5
                  </ModalBlindLabel>
                </>
              );
            })()}

            {/* BB 위치 */}
            {(() => {
               const totalPlayers = activePlayers.length;
               const bbIndexInPositions = positions.indexOf('BB');
               if (bbIndexInPositions === -1) return null;

               const bbPlayerIndex = (bbIndexInPositions + positionOffset) % totalPlayers;
               const bbAngleRad = ((bbPlayerIndex * (360 / totalPlayers)) - 90) * (Math.PI / 180);

              const bbDotX = centerX + (ellipseRadiusX - blindOffset) * Math.cos(bbAngleRad);
              const bbDotY = centerY + (ellipseRadiusY - blindOffset) * Math.sin(bbAngleRad);

              return (
                <>
                  <ModalBlindDot 
                    color="#1a73e8" 
                    style={{ 
                      left: bbDotX - 6, 
                      top: bbDotY - 6 
                    }} 
                  />
                  <ModalBlindLabel 
                    style={{ 
                      left: bbDotX + 18,
                      top: bbDotY - 10 
                    }}
                  >
                    1
                  </ModalBlindLabel>
                </>
              );
            })()}
          </>
        )}

        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Logo src="/logo_.png" alt="MGP Logo" style={{ height: '100px'}}/>
          </div>
          {players.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: '#8b8b8b',
              fontSize: '1.2rem',
              marginTop: '20px'
            }}>
              플레이어를 추가하면<br/>테이블에 표시됩니다
            </div>
          )}
        </div>
      </ModalPokerTable>
    );
  };

  return (
    <AppContainer>
      <MainContent sidebarOpen={sidebarOpen} leftSidebarOpen={leftSidebarOpen}>
        <Header>
          <Logo src="/logo_.png" alt="MGP Logo" />
        </Header>
        
        <TimerSection>
          <LevelDisplay>
            <LevelControls>
              <LevelButton 
                onClick={increaseLevel}
                disabled={currentLevel >= blindLevels.length}
                title="레벨 올리기"
              >
                <FaChevronUp />
              </LevelButton>
              <LevelButton 
                onClick={decreaseLevel}
                disabled={currentLevel <= 1}
                title="레벨 내리기"
              >
                <FaChevronDown />
              </LevelButton>
            </LevelControls>
            LEVEL {currentLevel} - SB: {currentBlinds.smallBlind} / BB: {currentBlinds.bigBlind}
          </LevelDisplay>
          <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
          <ButtonGroup>
            {!isRunning && (
            <StartButton onClick={startTimer} disabled={isRunning}>
              <FaPlay color='#5878b1'/>
            </StartButton>
            )}
            {isRunning && (
            <PauseButton onClick={pauseTimer} disabled={!isRunning}>
              <FaPause color='#5878b1'/>
            </PauseButton>
            )}
            <StopButton onClick={stopTimer}>
              <FaStop /> 
            </StopButton>
            <ResetButton onClick={resetTimer}>
              <FaRedo />
            </ResetButton>
          </ButtonGroup>
        </TimerSection>
        <BottomLogo src="/logo.png" alt="Motemote Logo" />
      </MainContent>

      <LeftSidebarToggle 
        isOpen={leftSidebarOpen}
        onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
        title={leftSidebarOpen ? '좌측 사이드바 숨기기' : '좌측 사이드바 보이기'}
      >
        {leftSidebarOpen ? <FaTimes size={20} /> : <FaTableList size={20} />}
      </LeftSidebarToggle>

      <SidebarToggle 
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? '사이드바 숨기기' : '사이드바 보이기'}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaUsers size={20} />}
      </SidebarToggle>

      <BottomSidebarToggle 
        isOpen={bottomSidebarOpen}
        onClick={() => setBottomSidebarOpen(!bottomSidebarOpen)}
        title={bottomSidebarOpen ? '순위표 숨기기' : '순위표 보이기'}
      >
        {bottomSidebarOpen ? <FaTimes size={20} /> : <FaTrophy size={20} />}
      </BottomSidebarToggle>

              <LeftSidebar isOpen={leftSidebarOpen}>
          <SettingTitle><FaUsers />포커 테이블</SettingTitle>
          <div style={{ 
            marginTop: '56px',
            padding: '8px 12px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ 
              color: '#47bc62', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              marginBottom: '4px'
            }}>
              {players.filter(p => !p.eliminated).length}
            </div>
            <div style={{ 
              color: '#cccccc', 
              fontSize: '0.9rem'
            }}>
              활성 플레이어
            </div>
          </div>
          {renderPokerTable()}
        </LeftSidebar>

      <Sidebar isOpen={sidebarOpen}>
        <SettingsSection>
        <button
            onClick={toggleFullscreen}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 999999
            }}
            title={isFullscreen ? '전체화면 종료' : '전체화면 진입'}
          >
            {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
          </button>
          <SettingCard>
            <SettingTitle><FaUsers /> 플레이어 관리</SettingTitle>
            <Label>유저명</Label>
            <Input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Player Name"
            />
            <Label>바이인</Label>
            <Input
              type="number"
              value={startingChips}
              onChange={(e) => setStartingChips(parseInt(e.target.value) || 0)}
            />
            <AddPlayerButton onClick={addPlayer}>
              <FaUsers /> 플레이어 추가
            </AddPlayerButton>
          </SettingCard>

          <SettingCard>
            <SettingTitle><FaTrophy /> 토너먼트 설정</SettingTitle>
            <Label>레벨 지속 시간 (초):</Label>
            <Input
              type="number"
              value={levelDuration}
              onChange={(e) => setLevelDuration(parseInt(e.target.value) || 600)}
            />
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              {players.filter(p => !p.eliminated).length} 플레이어가 활성화되어 있습니다.
            </p>
          </SettingCard>
        </SettingsSection>

        <PlayersSection>
          <SettingTitle><FaUsers /> 플레이어 목록</SettingTitle>
          {players.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              color: '#8b8b8b', 
              fontSize: '0.9rem',
              backgroundColor: '#525252',
              borderRadius: '8px',
              border: '2px dashed #525252'
            }}>
              플레이어가 없습니다.<br/>"플레이어 관리" 섹션에서 플레이어를 추가해주세요.
            </div>
          ) : (
            <PlayersGrid>
              {players.map(player => (
                <PlayerCard 
                  key={player.id} 
                  eliminated={player.eliminated}
                >
                  <PlayerCardHeader>
                    <PlayerName eliminated={player.eliminated}>
                      <FaUser size={11} /> {player.name} 
                    </PlayerName>
                    <PlayerCardActions>
                      <EditButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newName = prompt('Enter Player Name:', player.name);
                          if (newName && newName.trim()) {
                            updatePlayerName(player.id, newName.trim());
                          }
                        }}
                        title="이름 변경"
                      >
                        <FaEdit size={12} color='#ffffff'/>
                      </EditButton>
                      <DeleteButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`${player.name}을 삭제하시겠습니까?`)) {
                            deletePlayer(player.id);
                          }
                        }}
                        title="플레이어 삭제"
                      >
                        <FaTrash size={12} color='#ffffff'/>
                      </DeleteButton>
                    </PlayerCardActions>
                  </PlayerCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {player.eliminated ? null : (
                  <PlayerChips>
                    칩 :  <input
                      disabled={player.eliminated}
                      type="number"
                      value={player.chips}
                      onChange={(e) => updatePlayerChips(player.id, parseInt(e.target.value) || 0)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        width: '80px', 
                        borderRadius: '3px', 
                        padding: '2px 5px',
                        color: '#bbbbbb',
                        backgroundColor: '#2b2c2e',
                        border: '2px solid #454545'
                        }}
                      />
                    </PlayerChips>
                    )}
                  <div 
                    style={{ 
                      fontSize: '0.8rem', 
                      color: player.eliminated ? '#ffffff' : '#83ff6f',
                      marginTop: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                    onClick={() => eliminatePlayer(player.id)}
                  >
                    {player.eliminated ? '탈락' : '활성'}
                  </div>
                  </div>
                </PlayerCard>
              ))}
            </PlayersGrid>
          )}
        </PlayersSection>
      </Sidebar>

      <BottomSidebar isOpen={bottomSidebarOpen}>
        <RankingTable>
          <RankingHeader>
            <RankingTitle>
              <FaTrophy /> 토너먼트 순위
            </RankingTitle>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={exportData}
                style={{
                  background: '#2b2c2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                title="데이터 내보내기"
              >
                Export
              </button>
              <label
                style={{
                  background: '#2b2c2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  display: 'inline-block'
                }}
                title="데이터 가져오기"
              >
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                onClick={clearAllData}
                style={{
                  background: '#2b2c2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                title="모든 데이터 삭제"
              >
                Clear All
              </button>
            </div>
          </RankingHeader>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px', gap: '10px', marginBottom: '10px' }}>
              <Input
                type="text"
                value={newTournament.winner}
                onChange={(e) => setNewTournament(prev => ({ ...prev, winner: e.target.value }))}
                placeholder="Name"
                style={{ margin: 0 }}
              />
              <Input
                type="number"
                value={newTournament.points}
                onChange={(e) => setNewTournament(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                placeholder="포인트"
                style={{ margin: 0 }}
              />
              <AddTournamentButton onClick={addTournamentResult}>
                포인트 추가
              </AddTournamentButton>
            </div>
          </div>

          {getSortedRankings().map((player, index) => (
            <RankingRow key={player.id} rank={index + 1}>
              <RankCell rank={index + 1}>#{index + 1}</RankCell>
              <PlayerCell>
                <input
                  type="text"
                  value={player.playerName}
                  onChange={(e) => updateTournamentPlayerName(player.id, e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'inherit',
                    width: '100%',
                    outline: 'none'
                  }}
                />
              </PlayerCell>
              <PointsCell>
                <input
                  type="text"
                  value={formatNumber(player.points)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    const numValue = parseInt(value) || 0;
                    updateTournamentPlayerPoints(player.id, numValue);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'inherit',
                    width: '80px',
                    outline: 'none',
                    textAlign: 'right'
                  }}
                />
                {' '}pts
              </PointsCell>

              <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => deleteTournamentPlayer(player.id)}
                  style={{
                    background: '#2b2c2e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: 'bold'

                  }}
                  title="플레이어 삭제"
                >
                  <FaTrash size={12} color='#5e5e5e'/>
                </button>
              </div>
            </RankingRow>
          ))}
        </RankingTable>
      </BottomSidebar>

      {/* 테이블 모달 */}
      <TableModalOverlay 
        isOpen={isTableModalOpen}
        onClick={() => setIsTableModalOpen(false)}
      >
        <TableModalContent 
          isOpen={isTableModalOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <TableModalCloseButton onClick={() => setIsTableModalOpen(false)}>
            <FaTimes size={20} />
          </TableModalCloseButton>
          
          <div style={{ textAlign: 'center', marginBottom: '120px' }}>
            <h2 style={{ 
              color: 'white', 
              fontSize: '2rem', 
              margin: '0 0 10px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              포커 테이블
            </h2>
            <div style={{ 
              color: '#83ff6f', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {players.filter(p => !p.eliminated).length}명의 활성 플레이어
            </div>
          </div>
          
          {renderModalPokerTable()}
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: '100px',
            gap: '20px'
          }}>
            {players.filter(p => !p.eliminated).length > 1 && (
              <>
                <button
                  onClick={rotatePositions}
                  style={{
                    background: '#df605e',
                    color: 'white',
                    border: '2px solid #df605e',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaRedo /> 포지션 회전
                </button>
                <div style={{
                  color: '#cccccc',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  opacity: 0.8
                }}>
                  💡 스페이스바를 눌러서 포지션을 회전할 수 있습니다
                </div>
              </>
            )}
          </div>

          {/* 모달 컨트롤 버튼들 */}
          <ModalControlButtons>
            {!isRunning && (
              <ModalStartButton onClick={startTimer} disabled={isRunning}>
                <FaPlay size={12} />
              </ModalStartButton>
            )}
            {isRunning && (
              <ModalPauseButton onClick={pauseTimer} disabled={!isRunning}>
                <FaPause size={12} />
              </ModalPauseButton>
            )}
            <ModalStopButton onClick={stopTimer}>
              <FaStop size={12} />
            </ModalStopButton>
            <ModalResetButton onClick={resetTimer}>
              <FaRedo size={12} />
            </ModalResetButton>
          </ModalControlButtons>

          {/* 모달 레벨 컨트롤 */}
          <ModalLevelControls>
            <ModalLevelButton 
              onClick={increaseLevel}
              disabled={currentLevel >= blindLevels.length}
              title="레벨 올리기"
            >
              <FaChevronUp />
            </ModalLevelButton>
            <ModalLevelButton 
              onClick={decreaseLevel}
              disabled={currentLevel <= 1}
              title="레벨 내리기"
            >
              <FaChevronDown />
            </ModalLevelButton>
          </ModalLevelControls>

          {/* 모달 타이머 */}
          <ModalTimer>
            <ModalTimerDisplay>{formatTime(timeLeft)}</ModalTimerDisplay>
            <ModalLevelDisplay>
              LEVEL {currentLevel} - SB: {currentBlinds.smallBlind} / BB: {currentBlinds.bigBlind}
            </ModalLevelDisplay>
          </ModalTimer>
        </TableModalContent>
      </TableModalOverlay>
    </AppContainer>
  );
}

export default App;