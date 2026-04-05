import { collection, getDocs, doc, getDoc, query, where, orderBy, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Contest, Problem } from "../data/mock";

export async function getPublishedContests(): Promise<Contest[]> {
  const q = query(
    collection(db, "contests"),
    where("isPublished", "==", true),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contest));
}

export async function getAllContests(): Promise<Contest[]> {
  const q = query(collection(db, "contests"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contest));
}

export async function getContestBySlug(slug: string): Promise<Contest | null> {
  const q = query(collection(db, "contests"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Contest;
}

export async function getProblemsByContest(contestId: string): Promise<Problem[]> {
  const q = query(collection(db, "problems"), where("contestId", "==", contestId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Problem));
}

export async function getProblemBySlug(slug: string): Promise<Problem | null> {
  const q = query(collection(db, "problems"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Problem;
}

export async function getAllProblems(): Promise<Problem[]> {
  const snapshot = await getDocs(collection(db, "problems"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Problem));
}

export async function seedDatabase() {
  const { mockContests, mockProblems } = await import("../data/mock");
  
  for (const contest of mockContests) {
    const { id, ...data } = contest;
    await setDoc(doc(db, "contests", id), data);
  }
  
  for (const problem of mockProblems) {
    const { id, ...data } = problem;
    await setDoc(doc(db, "problems", id), data);
  }
}
