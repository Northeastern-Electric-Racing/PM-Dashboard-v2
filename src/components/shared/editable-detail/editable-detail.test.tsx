/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import { render, screen } from '../../../test-support/test-utils';
import { exampleWorkPackage1 } from 'utils/lib/dummy-data';
import EditableDetail from './editable-detail';
import { EditModeContext } from '../../projects/wbs-details/work-package-container/work-package-container';

// describe('Rendering Work Package Detail Component', () => {
//   const wp: WorkPackage = exampleWorkPackage1;
//   it('renders the correct field and mode, title with edit mode enabled', () => {
//     render(
//       <EditModeContext.Provider value={true}>
//         <WorkPackageDetail type="title" workPackage={wp} />
//       </EditModeContext.Provider>
//     );
//     expect(screen.getByText(`Work Package Name:`)).toBeInTheDocument();
//     expect(screen.queryByPlaceholderText(wp.name)).toBeInTheDocument();
//   });
//   it('renders the correct field and mode, title with edit mode disabled', () => {
//     render(
//       <EditModeContext.Provider value={false}>
//         <WorkPackageDetail type="title" workPackage={wp} />
//       </EditModeContext.Provider>
//     );
//     expect(screen.getByText(`Work Package Name:`)).toBeInTheDocument();
//     expect(screen.queryByPlaceholderText(wp.name)).not.toBeInTheDocument();
//   });
//   it('renders the correct field and mode, wbs with edit mode enabled', () => {
//     render(
//       <EditModeContext.Provider value={true}>
//         <WorkPackageDetail type="wbs" workPackage={wp} />
//       </EditModeContext.Provider>
//     );
//     expect(screen.getByText(`WBS #:`)).toBeInTheDocument();
//     expect(screen.queryByPlaceholderText(wp.name)).toBeInTheDocument();
//   });
//   it('renders the correct field and mode, wbs with edit mode disabled', () => {
//     render(
//       <EditModeContext.Provider value={false}>
//         <WorkPackageDetail type="wbs" workPackage={wp} />
//       </EditModeContext.Provider>
//     );
//     expect(screen.getByText(`WBS #:`)).toBeInTheDocument();
//     expect(screen.queryByPlaceholderText(wp.name)).not.toBeInTheDocument();
//   });
// });
