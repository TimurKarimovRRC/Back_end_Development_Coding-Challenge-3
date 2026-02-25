import { db } from "../../../config/firebaseConfig";
import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp
} from "firebase-admin/firestore";

function getCollectionReference(collectionName: string): CollectionReference<DocumentData> {
  return db.collection(collectionName);
}

function convertFirestoreValue(value: unknown): unknown {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (Array.isArray(value)) {
    return value.map((arrayItem: unknown) => convertFirestoreValue(arrayItem));
  }

  if (value !== null && typeof value === "object") {
    const convertedObject: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      convertedObject[key] = convertFirestoreValue(nestedValue);
    }

    return convertedObject;
  }

  return value;
}

function mapSnapshotToObject<T>(snapshot: QueryDocumentSnapshot<DocumentData>): T & { id: string } {
  const rawData: DocumentData = snapshot.data();
  const convertedData: Record<string, unknown> = convertFirestoreValue(rawData) as Record<string, unknown>;

  return {
    id: snapshot.id,
    ...(convertedData as T)
  };
}

// Creates a document, returns the created data with ID
export async function createDocument<T>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> {
  const collectionReference: CollectionReference<DocumentData> = getCollectionReference(collectionName);

  const documentReference = await collectionReference.add(data as DocumentData);
  const createdSnapshot = await documentReference.get();

  if (!createdSnapshot.exists) {
    throw new Error("Failed to create document.");
  }

  return mapSnapshotToObject<T>(createdSnapshot as QueryDocumentSnapshot<DocumentData>);
}

// Gets all documents in a collection
export async function getAllDocuments<T>(collectionName: string): Promise<(T & { id: string })[]> {
  const collectionReference: CollectionReference<DocumentData> = getCollectionReference(collectionName);
  const querySnapshot = await collectionReference.get();

  const documents: (T & { id: string })[] = querySnapshot.docs.map(
    (documentSnapshot: QueryDocumentSnapshot<DocumentData>) => mapSnapshotToObject<T>(documentSnapshot)
  );

  return documents;
}

// Gets a document by ID, returns null if not found
export async function getDocumentById<T>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const documentReference = getCollectionReference(collectionName).doc(id);
  const documentSnapshot = await documentReference.get();

  if (!documentSnapshot.exists) {
    return null;
  }

  return mapSnapshotToObject<T>(documentSnapshot as QueryDocumentSnapshot<DocumentData>);
}

// Updates a document, returns updated data
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<T & { id: string }> {
  const documentReference = getCollectionReference(collectionName).doc(id);
  const existingSnapshot = await documentReference.get();

  if (!existingSnapshot.exists) {
    throw new Error("Document not found.");
  }

  await documentReference.update(data as DocumentData);

  const updatedSnapshot = await documentReference.get();

  if (!updatedSnapshot.exists) {
    throw new Error("Failed to read updated document.");
  }

  return mapSnapshotToObject<T>(updatedSnapshot as QueryDocumentSnapshot<DocumentData>);
}

// Deletes a document
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  const documentReference = getCollectionReference(collectionName).doc(id);
  const existingSnapshot = await documentReference.get();

  if (!existingSnapshot.exists) {
    throw new Error("Document not found.");
  }

  await documentReference.delete();
}