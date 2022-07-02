/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Col, Container, Row } from 'react-bootstrap';
import { UserSettings } from 'utils';

interface UserSettingsViewProps {
  settings: UserSettings;
}

/** Component to display user settings */
const UserSettingsView: React.FC<UserSettingsViewProps> = ({ settings }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={6} lg={4}>
          <b>Default Theme:</b> {settings.defaultTheme}
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettingsView;
