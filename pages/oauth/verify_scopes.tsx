import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import * as querystring from "querystring";
import { inMemoryClientRepository, inMemoryScopeRepository } from "../../lib/oauth/repository";

export async function getServerSideProps(context) {
  const { scope, client_id } = context.query;

  const scopes = await inMemoryScopeRepository.getAllByIdentifiers(scope);
  const client = await inMemoryClientRepository.getByIdentifier(client_id);

  return {
    props: { scopes, client },
  };
}

export default function VerifyScopes({ scopes, client }) {
  const { query } = useRouter();
  const submitUrl = useMemo(() => "/api/oauth/verify_scopes?" + querystring.stringify(query), [query]);

  return <div>
    <p>Do you allow <strong>{client.name}</strong> the following permissions?</p>
    <ul>
      {scopes.map(scope => <li key={scope.name}>{scope.description}</li>)}
    </ul>
    <form action={submitUrl} method="POST">
      <input type="hidden" name="accepted" value="true"/>
      <button type="submit">Allow</button>
    </form>
    <form action={submitUrl} method="POST">
      <input type="hidden" name="accepted" value="false"/>
      <button type="submit">Deny</button>
    </form>
  </div>;
}
