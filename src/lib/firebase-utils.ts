import * as fbdb from "firebase/database";
import { database } from "./firebase";

export function getWithKey(data: any, options?: any) {
  const array = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });

  return options?.isFirstOrDefault ? array[0] : array;
}

export async function setThread(identifier: string) {
  const threadRef = fbdb.push(fbdb.ref(database, "threads"));

  await fbdb.set(threadRef, { identifier: identifier });

  const snapshot = await fbdb.get(threadRef);

  const thread = snapshot.val();

  return { ...thread, key: snapshot.key };
}

export async function getThread(identifier: string) {
  const threadRef = fbdb.ref(database, "threads");

  const endpoint = fbdb.query(
    threadRef,
    fbdb.orderByChild("identifier"),
    fbdb.equalTo(identifier)
  );

  const snapshot = await fbdb.get(endpoint);

  if (snapshot.exists()) {
    return getWithKey(snapshot.val(), { isFirstOrDefault: true });
  }

  return setThread(identifier);
}
