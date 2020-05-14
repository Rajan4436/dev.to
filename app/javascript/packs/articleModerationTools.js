/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const user = userData();
const { authorId: articleAuthorId, path } = document.getElementById(
  'article-show-container',
).dataset;

const initializeModerationsTools = async () => {
  const { default: initializeActionsPanel } = await import(
    '../actionsPanel/initializeActionsPanelToggle'
  );
  const { default: initializeFlagUserModal } = await import('./flagUserModal');

  if (
    user.trusted &&
    user.id !== articleAuthorId &&
    !top.document.location.pathname.endsWith('/mod')
  ) {
    initializeActionsPanel(user, path);
    initializeFlagUserModal(articleAuthorId);
  }
};

initializeModerationsTools();
