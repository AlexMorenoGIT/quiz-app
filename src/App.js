import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Trophy, HelpCircle, ChevronRight } from 'lucide-react';

const Quiz = () => {
  // Base de questions
  const questions = [
  {
    question: "Les Pods peuvent être créés directement sans être associés à un contrôleur.",
    answer: true,
    explanation: "Les Pods peuvent être créés manuellement sans contrôleur, mais ils ne seront pas gérés automatiquement en cas de panne."
  },
  {
    question: "Un Pod peut contenir à la fois des conteneurs Linux et Windows.",
    answer: false,
    explanation: "Un Pod ne peut contenir que des conteneurs qui fonctionnent sur le même type de système d'exploitation (Linux ou Windows)."
  },
  {
    question: "Kubernetes supporte les volumes persistants NFS pour les Pods.",
    answer: true,
    explanation: "Kubernetes prend en charge plusieurs types de volumes persistants, y compris NFS."
  },
  {
    question: "Un Pod peut exécuter des conteneurs dans des namespaces réseau différents.",
    answer: false,
    explanation: "Tous les conteneurs dans un Pod partagent le même namespace réseau, ce qui signifie qu'ils peuvent communiquer entre eux."
  },
  {
    question: "Les ReplicaSets peuvent être utilisés indépendamment des Deployments.",
    answer: true,
    explanation: "Les ReplicaSets peuvent être utilisés seuls, mais ils sont généralement gérés par un Deployment pour un déploiement plus souple."
  },
  {
    question: "Un Pod peut avoir des labels pour être sélectionné par un Service.",
    answer: true,
    explanation: "Les labels sont utilisés pour faire correspondre les Pods aux Services, afin que le trafic puisse être dirigé vers eux."
  },
  {
    question: "Les Pods peuvent être utilisés pour déployer des applications sans aucune ressource allouée.",
    answer: false,
    explanation: "Les Pods doivent toujours être configurés avec des ressources, comme des CPU et de la mémoire, pour garantir une gestion efficace."
  },
  {
    question: "Un Pod avec un seul conteneur peut avoir une ressource de type VolumeMount.",
    answer: true,
    explanation: "Même un Pod avec un seul conteneur peut avoir des Volumes et des VolumeMounts pour stocker et accéder à des données."
  },
  {
    question: "Un Namespace est un mécanisme permettant de partitionner un cluster Kubernetes.",
    answer: true,
    explanation: "Les Namespaces sont utilisés pour organiser et séparer les ressources dans un cluster Kubernetes."
  },
  {
    question: "Les Pods peuvent être déployés sur des machines virtuelles dans un environnement hybride.",
    answer: true,
    explanation: "Les Pods peuvent être déployés sur des machines virtuelles dans des environnements multi-cloud ou hybrides."
  },
  {
    question: "Les Secrets Kubernetes sont stockés en clair dans etcd.",
    answer: false,
    explanation: "Les Secrets sont par défaut encodés en base64, mais ils peuvent être chiffrés en repos si configuré explicitement."
  },
  {
    question: "Les Services de type LoadBalancer créent automatiquement des instances de serveurs dans un cloud public.",
    answer: true,
    explanation: "Lorsque vous utilisez un Service LoadBalancer, Kubernetes crée automatiquement une instance dans le cloud public, si configuré."
  },
  {
    question: "Les Deployments Kubernetes ne peuvent pas gérer les Pods avec des conteneurs dans un état d'erreur.",
    answer: false,
    explanation: "Les Deployments peuvent gérer les Pods en erreur en effectuant des redémarrages ou des rollbacks en fonction de la configuration."
  },
  {
    question: "Il est possible d'utiliser un Pod pour déployer plusieurs services distincts.",
    answer: true,
    explanation: "Un Pod peut contenir plusieurs conteneurs qui fournissent des services distincts tout en partageant le même environnement réseau et de stockage."
  },
  {
    question: "Les Volumes Kubernetes peuvent être attachés à plusieurs Pods en même temps.",
    answer: true,
    explanation: "Les Volumes persistants peuvent être partagés entre plusieurs Pods si le type de volume le permet."
  },
  {
    question: "Les HPA peuvent ajuster le nombre de réplicas d'un Pod en fonction de la charge CPU uniquement.",
    answer: false,
    explanation: "Les HPA peuvent ajuster le nombre de réplicas en fonction de la CPU, de la mémoire, ou de métriques personnalisées."
  },
  {
    question: "Kubernetes prend en charge le déploiement d'applications en conteneurs sans nécessiter de gestion des nœuds.",
    answer: true,
    explanation: "Kubernetes abstrait la gestion des nœuds et permet de se concentrer sur le déploiement des applications sans gérer directement les machines physiques."
  },
  {
    question: "Un Pod de type DaemonSet s'exécute sur chaque nœud du cluster.",
    answer: true,
    explanation: "Les DaemonSets garantissent qu'une copie d'un Pod s'exécute sur chaque nœud ou sur les nœuds sélectionnés du cluster."
  },
  {
    question: "Un Ingress permet de définir des règles de routage HTTP et HTTPS pour le trafic entrant.",
    answer: true,
    explanation: "L'Ingress permet de gérer le routage HTTP et HTTPS dans un cluster Kubernetes en fonction des règles définies."
  },
  {
    question: "Les Pods peuvent être configurés pour redémarrer automatiquement en cas d'échec.",
    answer: true,
    explanation: "Kubernetes offre une politique de redémarrage pour les Pods, garantissant qu'ils sont redémarrés en cas de panne."
  },
  {
    question: "Un StatefulSet assure une identification persistante des Pods, même après un redémarrage.",
    answer: true,
    explanation: "Le StatefulSet assure que les Pods ont des identifiants uniques et persistants, même après un redémarrage."
  },
  {
    question: "Les ReplicaSets ne sont utilisés que pour les applications sans état.",
    answer: false,
    explanation: "Les ReplicaSets peuvent être utilisés pour gérer des applications à la fois sans état et avec état."
  },
  {
    question: "Les ressources dans Kubernetes peuvent être configurées avec des quotas pour limiter l'utilisation des ressources.",
    answer: true,
    explanation: "Les quotas peuvent être appliqués dans un namespace pour limiter la quantité de ressources utilisées par les utilisateurs et les applications."
  },
  {
    question: "Un Pod de type StaticPod est géré par le contrôleur kubelet plutôt que par Kubernetes.",
    answer: true,
    explanation: "Les StaticPods sont gérés directement par le kubelet sur chaque nœud sans nécessiter de contrôleur Kubernetes."
  },
  {
    question: "Un ReplicaSet gère un ensemble de Pods et leur réplication, mais ne peut pas gérer les mises à jour.",
    answer: true,
    explanation: "Un ReplicaSet gère la réplication, mais c'est un Deployment qui gère les mises à jour de version des Pods."
  },
  {
    question: "Les ConfigMaps peuvent stocker des informations sensibles comme des mots de passe.",
    answer: false,
    explanation: "Les ConfigMaps ne sont pas conçus pour stocker des informations sensibles. Les Secrets sont plus appropriés pour cela."
  },
  {
    question: "Les namespaces Kubernetes peuvent être utilisés pour séparer les environnements de développement et de production.",
    answer: true,
    explanation: "Les namespaces permettent de séparer les environnements, en garantissant que les ressources ne se mélangent pas."
  }
];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleAnswer = (userAnswer) => {
    setShowAnswer(true);
    if (userAnswer === 'unknown') {
      setScore(0);
    } else if (userAnswer === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    } else {
      setScore(0);
    }
    setQuestionsAnswered(prev => prev + 1);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Score: {score}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1}/{questions.length}
          </p>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            {questions[currentQuestionIndex].question}
          </h3>
          <div className="flex gap-4">
            <Button
              onClick={() => handleAnswer(true)}
              disabled={showAnswer}
              className="w-24"
            >
              VRAI
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              disabled={showAnswer}
              variant="outline"
              className="w-24"
            >
              FAUX
            </Button>
          </div>
          {showAnswer && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-medium mb-2">
                {questions[currentQuestionIndex].answer ? "Bonne réponse !" : "Mauvaise réponse."}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {questions[currentQuestionIndex].explanation}
              </p>
              <Button
                onClick={nextQuestion}
                className="mt-4 flex items-center gap-2"
              >
                Question suivante
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;