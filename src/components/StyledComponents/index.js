import styled from 'styled-components'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
export const HomeDiv = styled.div`
  margin: 5px;
`

export const HeaderDiv = styled(FlexRow)`
  justify-content: space-between;
  padding: 1vw;
  padding: 0px;
  border-bottom: 2px solid lightgrey;
`
export const MenuButton = styled.button`
  min-width:150px;
  font-size:16px;
  padding:10px;
  background: transparent;
  border: 0px none;
  border-bottom: 2px solid
    ${props => (props.activeButton === props.id ? 'orange' : 'transparent')};
  color: ${props => (props.activeButton === props.id ? 'orange' : 'black')};
`
export const MenuButtonDiv = styled(FlexRow)`
  padding-top: 5px;
  border-bottom: 2px solid lightgrey;
  overflow:auto;
  justify-content:space-between;
`

export const MenuItemDiv = styled(FlexColumn)`
  padding: 5px;
`
export const MenuItem = styled(FlexRow)`
  justify-content: space-between;
  padding:10px;
  border-radius:2px;
  border: 1px solid grey;
  margin:4px;
`

export const QuantityButtonDiv = styled(FlexRow)`
  height: 4vh;
  width: 10vw;
  border-radius: 2vh;
  background-color: green;
  color: white;
  justify-content:space-around;
  align-items:center;
  padding:10px;
`
export const QuantityButton = styled.button`
  background:transparent;
  color: white;
  border-width:0px;
`

export const DishImage = styled.img`
  height:20vh;
  width:20vh;
`

export const MenuSubDiv1 = styled(FlexColumn)`
  width:45vw;
`
export const MenuSubDiv2 = styled(FlexRow)`
  justify-content:space-between;
  align-items:center;
  width:45vw;
`
export const OrdersDiv = styled(FlexRow)`
  align-items:center;
`
export const CartDiv = styled(FlexRow)`
  background-color:orange;
  height:4vh;
  min-width:10vw;
  border-radius:2vh;
  align-items:center;
  justify-content:space-around;
  padding-right:2vw;
  margin:5px;
`
