import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
<<<<<<< Updated upstream

import "./index.scss";

const App = () => {
 return <MainView />;
=======
import Container from 'react-bootstrap/Container';
import "./index.scss";

const MyMovieApplication = () => {
      return (
        <Container>
          <MainView />
        </Container>
      );
>>>>>>> Stashed changes
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyMovieApplication />);
