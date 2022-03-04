import styled from "@emotion/styled";
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'

export const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;

  .mapboxgl-popup-tip {
    display: none;
  }

  .mapboxgl-popup-content {
    color: #48466D;
    background: #FFFFFF;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    padding: 16px;
    width: 301px;
    display: flex;
    flex-direction: column;
  }
`

export const MarkerWrap = styled.div`
  cursor: 'pointer';
`

export const PopupTitle = styled.h3`
  font-family: Fredoka;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 4px;
`

export const PopupAddress = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  margin: 0 0 16px;
`

export const MapIcon = styled(MapOutlinedIcon)`
  fill: #FF9E9E;
  width: 18px;
  margin-right: 10px;
  margin-top: -2px;
`

export const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`