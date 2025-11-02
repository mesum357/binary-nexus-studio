import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle2, XCircle, Hourglass, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Enrollment {
  _id: string;
  course: {
    slug: string;
    title: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  purchaseDate?: string;
  expirationDate?: string;
  expired?: boolean;
  createdAt: string;
}

const MyCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchEnrollments();
  }, [user]);

  useEffect(() => {
    // Update countdowns every second
    const interval = setInterval(() => {
      updateCountdowns();
    }, 1000);

    return () => clearInterval(interval);
  }, [enrollments]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/enrollments/my-courses`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEnrollments(data.data);
          updateCountdowns();
        }
      } else {
        toast.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      toast.error('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const updateCountdowns = () => {
    const newCountdowns: Record<string, string> = {};
    const now = new Date();

    enrollments.forEach((enrollment) => {
      if (enrollment.status === 'approved' && enrollment.expirationDate && !enrollment.expired) {
        const expiration = new Date(enrollment.expirationDate);
        const diff = expiration.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          newCountdowns[enrollment._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[enrollment._id] = 'Expired';
        }
      }
    });

    setCountdowns(newCountdowns);
  };

  const getStatusBadge = (enrollment: Enrollment) => {
    if (enrollment.status === 'approved' && enrollment.expired) {
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Expired
        </Badge>
      );
    }
    if (enrollment.status === 'approved') {
      return (
        <Badge variant="default" className="gap-1 bg-green-600">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </Badge>
      );
    }
    if (enrollment.status === 'rejected') {
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="gap-1">
        <Hourglass className="h-3 w-3" />
        Pending
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const purchasedCourses = enrollments.filter(
    (e) => e.status === 'approved' && !e.expired
  );
  const expiredCourses = enrollments.filter(
    (e) => e.status === 'approved' && e.expired
  );
  const rejectedCourses = enrollments.filter((e) => e.status === 'rejected');
  const pendingCourses = enrollments.filter((e) => e.status === 'pending');

  const handleRenewCourse = (enrollment: Enrollment) => {
    navigate(`/digital-services/enroll/${enrollment.course.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-white/5 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            My Courses
          </h1>
          <p className="text-muted-foreground">
            Manage and track your enrolled courses
          </p>
        </motion.div>

        <Tabs defaultValue="purchased" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="purchased">
              Purchased ({purchasedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredCourses.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingCourses.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchased" className="space-y-4">
            {purchasedCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    You don't have any active courses yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              purchasedCourses.map((enrollment) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {enrollment.course.title}
                          </CardTitle>
                          <CardDescription>
                            Purchased on {enrollment.purchaseDate ? formatDate(enrollment.purchaseDate) : 'N/A'}
                          </CardDescription>
                        </div>
                        {getStatusBadge(enrollment)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Time remaining: {countdowns[enrollment._id] || 'Calculating...'}
                          </span>
                        </div>
                        {(() => {
                          const countdown = countdowns[enrollment._id];
                          if (!countdown || countdown === 'Expired') return null;
                          const daysRemaining = parseInt(countdown.split('d')[0]);
                          if (daysRemaining <= 5) {
                            return (
                              <Button
                                onClick={() => handleRenewCourse(enrollment)}
                                className="bg-brand-orange hover:bg-brand-orange-hover"
                              >
                                Renew Course
                              </Button>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            {expiredCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    You don't have any expired courses.
                  </p>
                </CardContent>
              </Card>
            ) : (
              expiredCourses.map((enrollment) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {enrollment.course.title}
                          </CardTitle>
                          <CardDescription>
                            Expired on {enrollment.expirationDate ? formatDate(enrollment.expirationDate) : 'N/A'}
                          </CardDescription>
                        </div>
                        {getStatusBadge(enrollment)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handleRenewCourse(enrollment)}
                        className="bg-brand-orange hover:bg-brand-orange-hover"
                      >
                        Renew Course
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    You don't have any pending course requests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingCourses.map((enrollment) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {enrollment.course.title}
                          </CardTitle>
                          <CardDescription>
                            Requested on {formatDate(enrollment.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(enrollment)}
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    You don't have any rejected course requests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              rejectedCourses.map((enrollment) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {enrollment.course.title}
                          </CardTitle>
                          <CardDescription>
                            Rejected on {formatDate(enrollment.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(enrollment)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handleRenewCourse(enrollment)}
                        variant="outline"
                      >
                        Re-enroll
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCourses;

