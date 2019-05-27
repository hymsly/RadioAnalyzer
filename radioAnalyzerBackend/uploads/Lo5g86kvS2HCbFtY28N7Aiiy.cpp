#include <bits/stdc++.h>
using namespace std;
#define fore(i, a, b) for (Long i = a, to = b; i < to; i++)
#define all(v) v.begin(), v.end()
#define SZ(v) (int)v.size()
#define pb push_back
typedef long long Long;
typedef pair<int, int> Pair;
int main() {
  ios::sync_with_stdio(0);
  cin.tie(NULL);
  int n, a, b, x, y;
  cin >> n >> a >> b >> x >> y;
  vector<int> t1, t2;
  if (b < a) {
    b += n;
  }
  if (y > x) {
    x += n;
  }
  while (a <= b) t1.pb(a++);
  while (x >= y) t2.pb(x--);
  bool ok = 0;
  fore(i, 0, SZ(t1)) {
    if (i == SZ(t2)) break;
    if (abs(t1[i] - t2[i] + 3 * n) % n == 0) ok = 1;
  }
  if (ok)
    cout << "YES\n";
  else
    cout << "NO\n";

  return 0;
}