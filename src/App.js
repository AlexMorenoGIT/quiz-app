import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Trophy, HelpCircle, ChevronRight } from 'lucide-react';

const Quiz = () => {
  // Base de questions
  const questions = [
    {
      question: "ETCD est généralement déployé en tant que pod dans un cluster Kubernetes",
      answer: false,
      explanation: "ETCD est généralement déployé en tant que processus système directement sur les nœuds master/control-plane, pas comme un pod, pour garantir sa stabilité et sa disponibilité."
    },
    {
      question: "Un Pod peut avoir plusieurs containers partageant le même espace de stockage",
      answer: true,
      explanation: "Les conteneurs dans un même Pod partagent le même espace de stockage et peuvent accéder aux mêmes volumes."
    },
    {
      question: "Un Service de type NodePort expose toujours un port dans la plage 30000-32767",
      answer: true,
      explanation: "Kubernetes réserve cette plage de ports spécifique pour les Services NodePort."
    },
    {
      question: "Un Pod peut avoir plusieurs ReplicaSets qui le contrôlent simultanément",
      answer: false,
      explanation: "Un Pod ne peut être contrôlé que par un seul ReplicaSet à la fois, grâce au système de labels et selectors."
    },
    {
      question: "Un PersistentVolume peut être provisionné dynamiquement sans StorageClass",
      answer: false,
      explanation: "Le provisionnement dynamique nécessite une StorageClass qui définit le provisioner à utiliser."
    },
    {
      question: "Les ConfigMaps peuvent stocker des données binaires",
      answer: true,
      explanation: "Les ConfigMaps peuvent stocker à la fois des données textuelles et binaires."
    },
    {
      question: "Un Deployment peut automatiquement faire un rollback si un pod ne démarre pas",
      answer: true,
      explanation: "Les Deployments supportent le rollback automatique basé sur les conditions de santé des pods."
    },
    {
      question: "Les Services peuvent faire du load balancing entre des pods dans différents namespaces",
      answer: false,
      explanation: "Par défaut, les Services ne peuvent faire du load balancing que vers des pods dans le même namespace."
    },
    {
      question: "Un StatefulSet garantit toujours l'unicité des noms de pods",
      answer: true,
      explanation: "Les StatefulSets créent des pods avec des noms prévisibles et uniques, basés sur un index numérique."
    },
    {
      question: "Les DaemonSets peuvent être limités à certains nœuds avec des nodeSelectors",
      answer: true,
      explanation: "Les DaemonSets peuvent utiliser nodeSelector et nodeAffinity pour cibler des nœuds spécifiques."
    },
    {
      question: "Un Ingress peut router le trafic vers des Services dans différents namespaces",
      answer: true,
      explanation: "Un Ingress peut router le trafic vers des Services dans n'importe quel namespace du cluster."
    },
    {
      question: "Les PersistentVolumeClaims peuvent demander plus d'espace après leur création",
      answer: false,
      explanation: "Les PVCs ne peuvent pas être redimensionnés après leur création, sauf si la StorageClass le permet explicitement."
    },
    {
      question: "Les init containers d'un Pod s'exécutent en parallèle",
      answer: false,
      explanation: "Les init containers s'exécutent séquentiellement, chacun devant se terminer avec succès avant le suivant."
    },
    {
      question: "Un HorizontalPodAutoscaler peut scaler basé sur des métriques personnalisées",
      answer: true,
      explanation: "HPA supporte les métriques personnalisées en plus des métriques standard comme CPU et mémoire."
    },
    {
      question: "Les Secrets sont automatiquement chiffrés au repos dans ETCD",
      answer: false,
      explanation: "Par défaut, les Secrets sont encodés en base64 mais pas chiffrés. Le chiffrement doit être configuré explicitement."
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