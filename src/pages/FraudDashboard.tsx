import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Eye, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnomalyFlag {
  id: string;
  transaction_id: string;
  anomaly_score: number;
  is_anomaly: boolean;
  detection_method: string;
  features_analyzed: any;
  reviewed: boolean;
  reviewer_comments: string | null;
  created_at: string;
  reviewed_at: string | null;
  transaction: {
    amount: number;
    currency: string;
    transaction_type: string;
    user_id: string;
    created_at: string;
  };
}

export default function FraudDashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [anomalyFlags, setAnomalyFlags] = useState<AnomalyFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<AnomalyFlag | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    fetchAnomalyFlags();
  }, []);

  const fetchAnomalyFlags = async () => {
    try {
      const { data, error } = await supabase
        .from('anomaly_flags')
        .select(`
          *,
          transaction:transactions (
            amount,
            currency,
            transaction_type,
            user_id,
            created_at
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setAnomalyFlags(data || []);
    } catch (error) {
      console.error('Error fetching anomaly flags:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات الاحتيال",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (flagId: string, reviewed: boolean, comments?: string) => {
    try {
      const { error } = await supabase
        .from('anomaly_flags')
        .update({
          reviewed,
          reviewer_comments: comments || null,
          reviewed_at: reviewed ? new Date().toISOString() : null
        })
        .eq('id', flagId);

      if (error) throw error;

      // Update local state
      setAnomalyFlags(prev => 
        prev.map(flag => 
          flag.id === flagId 
            ? { ...flag, reviewed, reviewer_comments: comments || null, reviewed_at: reviewed ? new Date().toISOString() : null }
            : flag
        )
      );

      toast({
        title: "تم التحديث",
        description: reviewed ? "تم وضع علامة مراجعة" : "تم إلغاء علامة المراجعة",
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating review status:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة المراجعة",
        variant: "destructive"
      });
    }
  };

  const handleReviewToggle = (flag: AnomalyFlag, reviewed: boolean) => {
    if (reviewed && !flag.reviewer_comments) {
      // Open dialog for comment if marking as reviewed without comment
      setSelectedFlag(flag);
      setReviewComment('');
    } else {
      updateReviewStatus(flag.id, reviewed);
    }
  };

  const saveReviewWithComment = () => {
    if (selectedFlag) {
      updateReviewStatus(selectedFlag.id, true, reviewComment);
      setSelectedFlag(null);
      setReviewComment('');
    }
  };

  const getSeverityBadge = (score: number) => {
    if (score > 0.8) return <Badge variant="destructive">عالي</Badge>;
    if (score > 0.6) return <Badge variant="secondary">متوسط</Badge>;
    return <Badge variant="outline">منخفض</Badge>;
  };

  const stats = {
    total: anomalyFlags.length,
    highRisk: anomalyFlags.filter(f => f.anomaly_score > 0.8).length,
    reviewed: anomalyFlags.filter(f => f.reviewed).length,
    pending: anomalyFlags.filter(f => !f.reviewed).length
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
            <p>جاري تحميل بيانات الأمان...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">لوحة كشف الاحتيال</h1>
          <p className="text-muted-foreground">مراقبة ومراجعة المعاملات المشبوهة</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التنبيهات</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عالي الخطورة</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.highRisk}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم المراجعة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.reviewed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Flags Table */}
      <Card>
        <CardHeader>
          <CardTitle>التنبيهات الأمنية</CardTitle>
          <CardDescription>
            قائمة بالمعاملات التي تم رصدها كمشبوهة أو غير طبيعية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نقاط الخطر</TableHead>
                <TableHead>معرف المعاملة</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalyFlags.map((flag) => (
                <TableRow key={flag.id} className={flag.is_anomaly ? "bg-red-50" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(flag.anomaly_score)}
                      <span className="text-sm">{(flag.anomaly_score * 100).toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {flag.transaction_id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {flag.transaction.amount} {flag.transaction.currency}
                  </TableCell>
                  <TableCell>{flag.transaction.transaction_type}</TableCell>
                  <TableCell>
                    {new Date(flag.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={flag.reviewed}
                        onCheckedChange={(checked) => handleReviewToggle(flag, checked)}
                      />
                      <span className="text-sm">
                        {flag.reviewed ? 'تمت المراجعة' : 'قيد الانتظار'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          تفاصيل
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>تفاصيل التنبيه الأمني</DialogTitle>
                          <DialogDescription>
                            تحليل مفصل للمعاملة المشبوهة
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium">نقاط الخطر</h4>
                              <p>{(flag.anomaly_score * 100).toFixed(1)}%</p>
                            </div>
                            <div>
                              <h4 className="font-medium">طريقة الكشف</h4>
                              <p>{flag.detection_method}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">تحليل المميزات</h4>
                            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                              {JSON.stringify(flag.features_analyzed, null, 2)}
                            </pre>
                          </div>
                          {flag.reviewer_comments && (
                            <div>
                              <h4 className="font-medium">تعليقات المراجع</h4>
                              <p className="text-sm bg-blue-50 p-3 rounded">
                                {flag.reviewer_comments}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Comment Dialog */}
      <Dialog open={!!selectedFlag} onOpenChange={() => setSelectedFlag(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة تعليق المراجعة</DialogTitle>
            <DialogDescription>
              أضف تعليقك حول هذا التنبيه الأمني
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب تعليقك هنا..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedFlag(null)}>
                إلغاء
              </Button>
              <Button onClick={saveReviewWithComment}>
                <MessageSquare className="h-4 w-4 mr-2" />
                حفظ التعليق
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}