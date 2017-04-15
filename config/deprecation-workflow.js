window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "container-lookupFactory" },
    { handler: "silence", matchId: "ds.serializer.private-should-serialize-has-many" }
  ]
};
