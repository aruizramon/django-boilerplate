import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-flexbox-grid';
import styled from 'styled-components';



const Background = styled.div`
  width: 100%;
  background: #7C807D;
  height: 100vh;
`;


class Main extends React.Component {
  render() {
    return (
      <Background>
        <Grid>
          Welcome.
        </Grid>
      </Background>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('react'));
