import React from 'react';
import { AlertTriangle, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface AnomalyAlertProps {
  isVisible: boolean;
  anomalyScore: number;
  transactionId: string;
  onViewDetails: () => void;
}

export const AnomalyAlert: React.FC<AnomalyAlertProps> = ({
  isVisible,
  anomalyScore,
  transactionId,
  onViewDetails
}) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  const severityLevel = anomalyScore > 0.8 ? 'high' : anomalyScore > 0.6 ? 'medium' : 'low';
  const alertColor = severityLevel === 'high' ? 'destructive' : 'default';

  return (
    <Alert variant={alertColor} className="mb-4 border-l-4 border-l-destructive animate-in slide-in-from-top-2">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium text-destructive">
            {t('anomaly.detected')} - {t(`anomaly.severity.${severityLevel}`)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t('anomaly.score')}: {(anomalyScore * 100).toFixed(1)}% | 
            {t('anomaly.transactionId')}: {transactionId.slice(0, 8)}...
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewDetails}
          className="ml-4 whitespace-nowrap"
        >
          <Eye className="h-3 w-3 mr-1" />
          {t('anomaly.viewDetails')}
        </Button>
      </AlertDescription>
    </Alert>
  );
};